import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"

export default function ({id}) {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(id)
    }, [])
    return <div>
        <input value={name} onChange={event => setName(event.target.value)} />
        Hello {name}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    return {
        props: {
            id
        }, // will be passed to the page component as props
    }
}