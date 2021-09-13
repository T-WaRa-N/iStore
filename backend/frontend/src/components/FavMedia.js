// stateless component
function FavMedia(props){
    // checking the local storage has run
    if(JSON.parse(localStorage.getItem("hasRun"))){
        // taking the array from the local storage
        const mediaList = JSON.parse(localStorage.getItem("myMedia"))
        return mediaList.map((elem, index)=>{
            return (
                <li>
                    {'Artist: '+ elem.artistName +' -&- '}
                    {'Media Name: ' + elem.trackName}
                    {/*<button onClick={()=>props.play(index)}>play</button>*/ }
                    <button onClick={()=>props.delete(index)}>delete</button>
                </li>
            )
        })

    }else{
        return false
    }
    
}

export default FavMedia
