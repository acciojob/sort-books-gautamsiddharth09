

export const sortBookSelector = (state)=>{
   const { list, sortBy, order } = state.books;
    
    return [...list].sort((a,b)=>{
      const valueA = a[sortBy]?.toLowerCase();
      const valueB = b[sortBy]?.toLowerCase();
      if(valueA < valueB) return order === "asc" ? -1 : 1;
      if(valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });
}
