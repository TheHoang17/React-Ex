/* eslint-disable react/prop-types */
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    CardImgOverlay,
  } from "reactstrap";
  import { Link } from "react-router-dom";
  function RenderDish({dish}) {
    if (dish != null)
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay className="card-overl">
            <CardTitle className="text-center">{dish.name}</CardTitle>
            <CardBody>{dish.description}</CardBody>
          </CardImgOverlay>
        </Card>
      );
    else {
      return <div></div>;
    }
  }
  
  function RenderComments({ comments }) {
    if (comments != null) {
      const comment = comments.map((comment) => {
        return (
          <div key={comment.id}>
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author}, &nbsp;
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </li>
          </div>
        );
      });
      return (
        <div className="text-center">
          <h4> Comments </h4>
          <ul className="list-unstyled">{comment}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  
  const DishDetail = (props) => {
    if (props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-6">
              <RenderComments comments={props.comments} />
            </div>
          </div>
        </div>
      );
    }
  };
  
  export default DishDetail;
  