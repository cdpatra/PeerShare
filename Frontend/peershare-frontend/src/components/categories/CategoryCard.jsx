function CategoryCard({categoryInfo}) {
  return (
     <div className="w-32 h-40 flex flex-col items-center bg-neutral-100 shadow-lg p-2 border-2 border-neutral-300 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-100">
        <div className="w-full h-28">
           <img
              className="w-full h-full object-contain"
              src={categoryInfo.thumbnail}
              alt={categoryInfo.categoryName}
           />
        </div>
        <div className="text-md text-center mt-1">{categoryInfo.categoryName}</div>
     </div>
  );
}

export default CategoryCard