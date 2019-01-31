import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function Menu({dishes}) {

	const menu = dishes.dishes.map((dish) => {
		return(
			<div key={dish.id} class="col-12 col-md-5 m-1">
			    <Link to={`/menu/${dish.id}`}>
					<Card>
				        <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
				        <CardImgOverlay>
				          <CardTitle>{dish.name}</CardTitle>
				        </CardImgOverlay>
				    </Card>
			    </Link>
		    </div>
		);
	});

	if (dishes.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (dishes.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{dishes.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
		return(
			<div className="container">
			    <div className="row">
	                <Breadcrumb>
	                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
	                    <BreadcrumbItem active>Menu</BreadcrumbItem>
	                </Breadcrumb>
	                <div className="col-12">
	                    <h3>Menu</h3>
	                    <hr />
	                </div>                
	            </div>
	            <div className="row">
	                {menu}
	            </div>
	        </div>
		);
}

export default Menu;