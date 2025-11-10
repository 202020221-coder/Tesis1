type Props = {
    messages: string | string[]
}

export const CustomMessage = ({ messages }: Props) => {
  return (
    <>
        {
            Array.isArray(messages) 
            ? (
                <ul>
                    {" "}
                    { messages.map((m) => ( <li> { m } </li> )) } 
                    {" "}
                </ul>
            ) 
            : ( <p>{messages}</p> )
        }
    </>
  )
}
