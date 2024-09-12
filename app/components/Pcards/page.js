import styles from "./page.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from "next/link";

export default function Card1() {
    return (

            <div className = {`container ${styles.wholeCard}`}>
    
                    <div className= {styles.cardImg }>
                        <Link href="/">      
                            <img src= "../card-1.jpg" /> 
                            <div className={styles.discount}>26%</div>
                        </Link>
                        <Link href="/" className={styles.wish}>
                             
                             <div className={styles.wishList}>
                                <FontAwesomeIcon icon="fa-regular fa-heart" style={{width: "35px", height: "14px" , color: "black"}} />
                            </div>                         
                        </Link>
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" className={`btn btn-light ${styles.eye}`} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                <FontAwesomeIcon icon="fa-regular fa-eye"  style={{width: "35px", height: "14px" , color: "black"}}/>                            
                            </button>

                        {/* <!-- Modal --> */}
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <div className>
                                        <img src= "../card-1.jpg" /> 
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                                   
                    </div>
                <Link href="/" className = {styles.anchor}>
                    <h3 className={styles.title}>
                        AC Light Dimmer SCR (220V-2000W) and
                    </h3>
                </Link>                        
                <div className={styles.lowerPart}>
                    <div className= {styles.price}>
                        <p><span>EGP135.00</span><br/>
                            EGP100.00
                        </p>
                    </div>
                    <button className={styles.shoppingCart}>
                        <Link href= "/">
                            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" style={{width: "30px", height: "14px" , color: "black" , marginTop : "5px"}} />
                        </Link>
                    </button>
                </div>


            </div>


    )
}
