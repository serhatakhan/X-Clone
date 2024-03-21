import Form from "../../components/Form"
import Post from "../../components/Post"

const Main = ( {user} ) => {
  return (
    <div className="border border-[#2f3336] overflow-y-auto">
      <header className="p-4 font-bold border-b border-[#2f3336]">Anasayfa</header>

      <Form user={user} />

      <Post />
      <Post />
      <Post />
      <Post />

    </div>
  )
}

export default Main