import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';

const PaginationComp = () => {
    const [data,setData] = useState([])

    const [pageData,setPageData] = useState([])
    const [page,setPage] = useState(1)
    const [pageCount,setPageCount] = useState(0)

    console.log(pageCount)
    useEffect(()=>{
        const fetchData=async()=>{
            const {data} = await axios.get(`https://dummyjson.com/products`)
            console.log(data.products)
            setData(data.products)
        }
        fetchData()
    },[page])

    useEffect(()=>{
        const pageDataCount=Math.ceil(data.length/5)
        setPageCount(pageDataCount)

        if(page){
            const LIMIT = 5
            const skip = LIMIT*page  //5*1=5
            const dataSkipped = data.slice(page===1 ? 0 :skip-LIMIT, skip)
            setPageData(dataSkipped)
        } 
        
    },[data]) 

    // handle Next
    const handleNext=()=>{
        if(page===pageCount){
            return page
        }else{
            setPage(page+1)
        }
    }

    // handle Previous
    const handlePrev=()=>{
        if(page===1){
            return page
        }else{
            setPage(page-1)
        }
    }


  return (
    <>
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.length> 0 &&
                        pageData.map(item=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title.slice(0,5)}</td>
                                <td>{item.price}</td>
                                <td>
                                <img src={item.thumbnail} style={{width:'50px',height:'50px'}} alt="" /> 
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
        <div style={{display:'flex',justifyContent:'end'}}>
            <Pagination>
                <Pagination.Prev onClick={handlePrev} disabled={page===1}  />
                {
                    Array(pageCount).fill(null).map((item,index)=>{
                        return <Pagination.Item active={page===index+1 ? true :false}>{index+1}</Pagination.Item>
                    })
                }
                <Pagination.Next onClick={handleNext} disabled={page===pageCount} />
            </Pagination> 
        </div>
    </>
  )
}

export default PaginationComp