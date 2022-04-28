import { useParams } from "react-router-dom";
import BrowseGroups from "./BrowseGroups";

function GetClassName() {
    let { id } = useParams();
    return (
        <BrowseGroups className={id} />
    )
}

export default GetClassName;