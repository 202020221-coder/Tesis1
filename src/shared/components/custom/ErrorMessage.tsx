interface Props  {
  messages: string[]
}

export const ErrorMessage = ({messages}:Props) => {
  return (
    <ul>
        {" "}
        {
            messages.map((message) => ( 
                <li>{message}</li> 
            ))
        }
        {" "}
    </ul>
  )
}
