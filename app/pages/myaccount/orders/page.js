import MyaccountSidebar from "@/app/components/MyaccountSidebar/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./page.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

export default function Orders () {
    return(
        <div className={`container`} style={{minHeight : "500px"}}>
            <MyaccountSidebar num ={2}/>
            
        </div>


    )
    

}