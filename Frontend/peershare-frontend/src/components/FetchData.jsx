import axios from 'axios';

const api=axios.create({
    baseURL:"http://localhost:8080/users/",
});

export const fetchdata= async ()=>{
 
    try{
        const token=localStorage.getItem("token");
        const res=await api.get("student",{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        console.log(res.data);
        return res.data;

    }
    catch(err){
        console.log("Fetching Error: ",err);
    }
}



