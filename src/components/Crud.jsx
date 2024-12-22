import React, { useEffect,useState } from "react";
import axios from "axios";

function Crud( ){
    const [dataCrud, setDataCrud] = useState([]);
    const [postData, setPostData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [deleteData, setDeleteData] = useState([]);

    const FetchData = async (URL) => {
      try {
        const response = await axios.get(URL);
        console.log(response.data);
        setDataCrud(response.data);
        return response.data;  // Zwracanie pobranych danych
      } catch (error) {
        console.error('There was an error making the GET request!', error);
        return [];  // Zwracanie pustej tablicy w razie błędu
      }
    };

    const PostData = (URL ,PostData) =>
    {
      axios.post(URL, PostData)
        .then(response => {
          // setPostData(response);
          // setDataCrud((prevData) => [prevData, response.data]);
          setPostData(response.data);
        })
        .catch(error => {
          console.error('There was an error making the POST request!', error);
        });
    }

    const PutData = (URL, updateData) => 
    {
      axios.put(URL, updateData)
          .then(response => {
            console.log(response.data); // Handle the response from the server
            setUpdateData(response.data)
          })
          .catch(error => {
            console.error('There was an error making the POST request!', error);
          });
    }

    const DeleteData = (URL) =>
    {
      axios.delete(URL)
          .then(response => {
            console.log("DELETED"); // Handle the response from the server
            setDeleteData(response);
          })
          .catch(error => {
            console.error('There was an error making the POST request!', error);
          });
    }



    return {
        FetchData, //GET Data
        dataCrud, //Ready Data STATE
        PostData, // POST Data
        postData,  //Ready post data STATE
        PutData, // PUT DATA
        updateData, // update Data STATE
        DeleteData, //DELETe
        deleteData // delete data STATE
    };
}

export default Crud;