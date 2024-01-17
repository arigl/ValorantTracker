import "../styles.css";
const UserProfile = (props: { userData: any }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between">
        {props.userData && (
          <div className="p-3 rounded flex flex-row">
            <img
              className="rounded mr-5"
              src={props.userData.smallAvatar}
              width={30}
            ></img>
            <div>
              <h1 className="text-black">
                {props.userData.name}
                <span>#{props.userData.tag}</span>
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
