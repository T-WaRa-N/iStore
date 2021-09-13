// stateless component
function Media(props){

    
    return props.mediaList.map((elem, index)=>{
        return (
            <li>
                {'Artist-> '+elem.artistName + ' * '}
                {'Media-Name-> '+elem.trackName + ' * '}
                {'Media Type-> '+elem.kind + ' <-> '}
                {/*<button onClick={()=>props.previewClick(index)}>preview</button> */}
                <button onClick={()=>props.addClick(index)}>add to favourites</button>
            </li>
        )
    })
}

export default Media
