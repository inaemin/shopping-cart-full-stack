```main.tsx
const myQueryClient = new MyQueryClient();
const MyQueryContext = createContext(null);

export function MyQueryProvider({children}) {
    return (
        <MyQueryContext.Provider value={{ myQueryClient }}>
            {children}
        </MyQueryContext.Provider>
    )
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MyQueryProvider>
            <App />
        </MyQueryProvider>
    </StrictMode>,
);
```

```MyQueryClient
interface QueryRecord<T> {
    queryFn: () => Promise<T>
    state: QueryState<T>
    listeners: Set<() => void>
}

interface QueryState<T> {
    status: "loading" | "idle" | "success" | "error"
    data: T | null
    error: unknown | null
}

interface QueryKey<T> {
    queryKey: string;
    queryFn: () => Promise<T>
}

export class MyQueryClient {
    private queryCache = new Map<string, QueryRecord<unknown>>()

    createQueryRecord<T>(query: QueryKey<T>) {
        const { queryKey, queryFn } = query;

        if (this.queryCache.has(queryKey)) return;

        const queryRecord: QueryRecord<T> = {
            queryFn,
            state: {
                status: "idle",
                data: null,
                error: null,
            },
            listeners: new Set()
        }
        this.queryCache.set(queryKey, queryRecord)
    }

    getQueryData(queryKey: string): unknown | null {
        return this.queryCache.get(queryKey)?.state.data ?? null;
    }

    getQueryState(queryKey: string): QueryState<unknown> {
        return this.queryCache.get(queryKey)?.state ?? null;
    }

    async fetchQuery(queryKey: string) {
        const queryRecord = this.queryCache.get(queryKey);
        if (!queryRecord) return;

        this.setQueryState(queryKey, {
            status: "loading",
            error: null
        }) // 기존 데이터 유지하면서 partial update

        try {
            const data = await queryRecord.queryFn();
            this.setQueryData(queryKey, data);
        } catch (error) {
            this.setQueryState(queryKey, {
                status: "error",
                error,
            })
            throw error;
        }
    }

    setQueryData(queryKey: string, data: unknown) {
        const queryRecord = this.queryCache.get(queryKey)
        if (!queryRecord) return;

        queryRecord.state = {
            status: "success",
            data,
            error: null
        };

        this.notify(queryKey)
    }

    setQueryState(queryKey: string, partialState: Partial<QueryState<unknown>>) {
        const queryRecord = this.queryCache.get(queryKey)
        if (!queryRecord) return;

        queryRecord.state = {
            ...queryRecord.state,
            ...partialState
        }

        this.notify(queryKey)
    }

    invalidate(queryKey: string) {
        // stale 처리 또는 refresh
        this.fetchQuery(queryKey);
    }

    subscribe(queryKey: string, listener: () => void): () => void {
        // listener 등록
        const queryRecord = this.queryCache.get(queryKey);
        if (!queryRecord) return () => {};

        const queryListeners = queryRecord.listeners
        queryListeners.add(listener)

        return () => {
            queryListeners.delete(listener)
        }
    }

    private notify(queryKey: string) {
        // listener 실행
        const queryRecord = this.queryCache.get(queryKey);
        if (!queryRecord) return;

        const queryListeners = queryRecord.listeners
        queryListeners.forEach((listener) => listener())
    }

}
```

```useMyQuery
function useMyQuery(queryKey, queryFn) {
    const myQuery = useContext(MyQueryContext)
    if (!myQuery) {
        throw new Error("MyQueryProvider 안에서 사용해야 합니다.")
    }

    const [queryState, setQueryState] = useState<QueryState<T>>({
        status: "idle",
        data: null,
        error: null,
    })

    useEffect(() => {
        myQuery.createQueryRecord(queryKey, queryFn);

        const unsubscribe = myQuery.subscribe(queryKey, () => {
            setQueryState(myQuery.getQueryState(queryKey))
        })

        myQuery.fetchQuery(queryKey);

        return unsubscribe;
    }, [])

    return {
        data: queryState.data,
        error: queryState.error,
        isLoading: queryState.status === "loading",
        hasError: queryState.status === "error",
        refetch: () => myQuery.fetchQuery(queryKey),
    }
}

```

```useMyMutation
type mutationOptions = {
    onMutate: () => {};
    onSuccess: () => {};
    onError: () => {};
    onSettled: () => {};
}
function useMyMutation(queryKey, mutationFn, options: mutationOptions) {
    const myQuery = useContext(MyQueryContext)
    if (!myQuery) {
        throw new Error("MyQueryProvider 안에서 사용해야 합니다.")
    }

    // 여기서 myqueryclient의 querykey를 invalidate 하고, 데이터 조작 api를 날림.
    const mutate = async (...args) => {
        let context; // 복구용 정보

        try {
            context = options.onMutate?.(args);
            const result = await mutationFn(args);
            options.onSuccess?.(result, args, context);
            return result;
        } catch (error) {
            options.onError?.(error, args, context)
            throw error;
        } finally {
            options.onSettled?.(args, context);
            myQuery.invalidate(queryKey); // 쿼리키 무효화
        }
    }

    return {
        mutate
    }
}
```

```useCartQuery
function useCartQuery() {
    const {isLoading, hasError, data, error, refetch} = useMyQuery("cart", getCart)
    const {selectionMap, addToSelectionMap, removeFromSelectionMap, toggleItemSelection, toggleAllItemSelection} = useCartSelection();

    const toCartItem = (data): CartItem => {
        const newData = {
            ...data,
            isSelected: selectionMap[data.id] ?? addToSelectionMap(data.id),
        }
        return {...newData}
    }

    const [cartList, setCartList] = useState<CartItem[] | null>(() => data.map(toCartItem))

    const hasNoCartItem = !isLoading && cartList && cartList.length === 0
    const hasCartItem = !isLoading && cartList && cartList.length !== 0
    const isAllSelected = cartList.every(item => item.isSelected);
    const isAbleToPurchase =

    const selectItem = (id) => {
        toggleItemSelection(id)
    }

    const selectAllItem = () => {
        const shouldSelectAll = !isAllSelected;
        toggleAllItemSelection(shouldSelectAll)
    }

    return {
        isLoading, hasError, hasNoCartItem, hasCartItem, isAllSelected, isAbleToPurchase, selectItem, selectAllItem, cartList
    }
}
```

```useCartSelection
function useCartSelection() {
    const [selectionMap, setSelectionMap] = useState<Record<number, boolean>>({});

    const addToSelectionMap = (): boolean => {

    }

    const removeFromSelectionMap = () => {

    }

    const toggleItemSelection = (id) => {

    }

    const toggleAllItemSelection = () => {

    }

    return {selectionMap, addToSelectionMap, removeFromSelectionMap, toggleItemSelection, toggleAllItemSelection}
}

```

```useCartSubmit
function useCartSubmit() {
    validateCartForm() {

    }

    submitCart() {
        const isValid = validateCartForm();
        if (!isValid) return;

        return orderSummary
    }
    return {
        submitCart
    }
}
```

```CartPage
function CartPage() {
    const { isLoading, hasError, hasNoCartItem, hasCartItem, isAllSelected, selectItem, selectAllItem, cartList } = useCartQuery()
    const { submitCart } = useCartSubmit(cartList)

    const handleSubmitCartForm = () => {
        const orderSummary = await submitCart();
        navigate('/order-confirm', state: orderSummary)
    }

    return
    ...
}
```

```CartItem
function CartItem() {

    return ...
}
```

```useUpdateCartItemQuantity
type Status = "idle" | "pending" | "error";

function useUpdateCartItemQuantity() {
    const [status, setStatus] = useState<Status>("idle");
    const { mutate } = useMyMutation("/cart", ({id, quantity}) => updateCartItemQuantity(id, quantity));

    const updateQuantity = async (id: number, quantity: number) => {
        setStatus("pending");
    try {
        await mutate({id, quantity});
        setStatus("idle");
    } catch (error) {
        setStatus("error");
        throw error;
    }
  };

    const increaseCartItemQuantity = async (id: number, quantity: number) => await updateQuantity(id, quantity + 1);
    const decreaseCartItemQuantity = async (id: number, quantity: number) => await updateQuantity(id, quantity - 1);

    return {
        isPending: status === "pending",
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
    };
}
```

```useOptimisticRemoveCartItem
function useOptimisticRemoveCartItem() {
    const queryClient = useMyQueryClient();
    const { mutate } = useMyMutation("/cart", ({ id }: {id: number}) => deleteCartItem(id), {
        onMutate: ({id}: {id: number}) => {
            const cartList = queryClient.getQueryData<CartItem[]>("/cart") ?? [];
            const deletedItem = cartList.find((item) => item.id === id);

            queryClient.setQueryData<CartItem[]>("/cart", (cartList) => cartList.filter((item) => item.id !== id))

            return { deletedItem }
        },
        onError: (_error, _variables, context) => {
            if (!context?.deletedItem) return;

            queryClient.setQueryData<CartItem[]>("/cart", (cartList) => [
                ...cartList, context.deletedItem
            ])
        }
    });

    const removeCartItem = async ({id}: {id: number}) => {
        await mutate({id});
    }

    return { removeCartItem };
}

```
