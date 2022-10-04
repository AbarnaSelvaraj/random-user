import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import getFlags from "../Utils/flags";

export default function UserCard({ user }) {
  const fullName = `${user?.name?.title} . ${user?.name?.first} ${user?.name?.last}`;
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  //
  return (
    <div className="   my-2 frame">
      <div className="bg-white rounded shadow-sm pt-3 pb-5 px-2">
        <img
          src={`${user.picture.large}`}
          alt=""
          width="100"
          className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
        />
        <h5 className="mb-0">{fullName}</h5>
        <span className="small text-muted">
          {user.location && (
            <span>
              {user.location.street && (
                <div className="row">
                  <div className="col-ld-6 col-md-12">{`${user.location.street.number}, ${user.location.street.name}`}</div>
                  <div className="cocol-ld-6 col-md-12l">{`${user.location.city}, ${user.location.state}`}</div>
                  <div className="cocol-ld-6 col-md-12l">{`${user.location.country}, ${user.location.postcode}`}</div>
                </div>
              )}
            </span>
          )}
        </span>

        <ul className="social mb-0 list-inline mt-3">
          {user?.gender === "male" ? (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                  <Tooltip {...props}>{user?.gender}</Tooltip>
                )}
                placement="top"
              >
                  <span className="social-link">
                    <i className="fa fa-male"></i>
                  </span>
              </OverlayTrigger>
            </li>
          ) : (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                  <Tooltip {...props}>{user?.gender}</Tooltip>
                )}
                placement="top"
              >
                  <span className="social-link">
                    <i className="fa fa-solid fa-female"></i>
                  </span>
              </OverlayTrigger>
            </li>
          )}
          {user.dob && (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                  <Tooltip {...props}>
                    {new Date(user?.dob?.date).toLocaleDateString()}
                  </Tooltip>
                )}
                placement="top"
              >
                  <span className="social-link">
                    <i className="fa fa-solid fa-birthday-cake"></i>
                  </span>
              </OverlayTrigger>
            </li>
          )}
          {user.email && (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 1, show: 1 }}
                overlay={(props) => <Tooltip {...props}>{user?.email}</Tooltip>}
                placement="top"
              >
                  <span className="social-link">
                    <i className="fa fa-solid fa-envelope"></i>
                  </span>
              </OverlayTrigger>
            </li>
          )}
          {user.phone && (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 1, show: 1 }}
                overlay={(props) => <Tooltip {...props}>{user?.phone}</Tooltip>}
                placement="top"
              >
                  <span className="social-link">
                    <i className="fa fa-solid fa-phone"></i>
                  </span>
              </OverlayTrigger>
            </li>
          )}
          {user.cell && (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 1, show: 1 }}
                overlay={(props) => <Tooltip {...props}>{user?.cell}</Tooltip>}
                placement="top"
              >
                  <span className="social-link">
                    <i className="fa fa-solid fa-mobile-phone"></i>
                  </span>
              </OverlayTrigger>
            </li>
          )}
          {user.nat && (
            <li className="list-inline-item">
              <OverlayTrigger
                delay={{ hide: 1, show: 1 }}
                overlay={(props) => (
                  <Tooltip {...props}>
                    {getFlags(user?.nat)} <br /> {regionNames.of(user.nat)}{" "}
                  </Tooltip>
                )}
                placement="top"
              >
                <li className="list-inline-item" style={{ paddingTop: "15px" }}>
                  <span className="social-link">
                    <svg viewBox="0 0 384 512" width={"50%"} height={"50%"}>
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
                    </svg>
                  </span>
                </li>
              </OverlayTrigger>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
