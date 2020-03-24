import React, { useState, useEffect } from 'react'
import axios from 'axios'

//class component
// class Game3 extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             query: 'd',
//             hits: []
//         }
//     }
//     componentDidMount(){
//         this.callApi();
//     }
//     async callApi(query){
//         let data = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
//         this.setState({
//             query: query,
//             hits: data.data
//         })
        
//     }
//     render(){
//         let list = []

//         if(this.state.hits.hits){
//             list = this.state.hits.hits.map((item)=>(
//                 <li key={item.objectID}>
//                     <a href={item.url}>
//                         {item.title}
//                     </a>
//                 </li>
//             ))
//         }

//         return (
//             <div>
//                 <input type="text" value={this.state.query} onChange={ (e)=> this.callApi(e.target.value)} />
//                 <ul>
//                     {list}
//                 </ul>
//             </div>
//         )
//     }
// }

const Game3 = () => {
    const [list, setList] = useState({ hits: [] })
    const [query, setQuery] = useState('')

    useEffect(() => {
        let isLoad = false
        async function fetchData(){
            let data = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
            if(!isLoad) setList(data.data)
        }

        fetchData();
        return () => { isLoad = true; }
    }, [query])

    return (
        <div>
            <input type="text" value={query} onChange={ (e)=> setQuery(e.target.value)} />
            <ul>
                {
                    list.hits.map((item)=>(
                        <li key={item.objectID}>
                            <a href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Game3