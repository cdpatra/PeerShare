import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

function Categories() {
   const [categories, setCategories] = useState();
   useEffect(() => {
      const token = localStorage.getItem("token");
      (async () => {
         try {
            const { data } = await axios.get("http://localhost:8080/users/category", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            console.log(data);
            setCategories(data);
         } catch (error) {
            console.log(error.message);
         }
      })();
   }, []);
   return (
      <div className="mt-10 flex flex-wrap gap-8 justify-start">
         {categories &&
            categories.map((categoryInfo) => (
               <CategoryCard key={categoryInfo.categoryId} categoryInfo={categoryInfo} />
            ))}
      </div>
   );
}

export default Categories;
