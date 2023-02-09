import { useSelector } from "react-redux"

export default function SearchBar() {

    const globalState = useSelector(state => state)

    return (
        <form>
            <input type="text" placeholder="Search..." />
            <input type="submit" name="Value"/>
        </form>
    )
}