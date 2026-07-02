
/*this is for learning context api's
const About = () => {
    const a = useContext(NoteContext)
    useEffect(()=>{
        a.update()
        // eslint-disable-next-line
    }, [])
  return (
    <div>
      i am {a.state.name} in class {a.state.class}
    </div>
  )
}*/
const About = ()=>{
    return (
        <>
          <h1>about me</h1>
          <p>hey i am shreyas, i have created this project while learning react</p>
        </>
    )
}
export default About
