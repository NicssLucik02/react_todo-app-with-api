//  const [isLoading, setIsLoading] = useState<LoadingTypes>({
//     todos: false,
//     add: false,
//     deletedId: null,
//     update: null,
//   });

//     const handleChangeLoading = <K extends keyof LoadingTypes>(
//       key: K,
//       value: LoadingTypes[K],
//     ) => {
//       setIsLoading(prev => ({ ...prev, [key]: value }));
//     };

// useEffect(() => {
//   if (
//     !isLoading.add &&
//     !isLoading.todos &&
//     !isLoading.deletedId &&
//     inputRef.current
//   ) {
//     inputRef.current.focus();
//   }

// }, [isLoading.add, isLoading.todos, isLoading.deletedId]);
