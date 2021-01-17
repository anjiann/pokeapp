export const NotFound: React.FunctionComponent<any> = () => {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + "/page404_LI.jpg"}
        alt="Page not found"
        style={{width:"100%", height:"50vw"}}
      />
    </div>
  );
};
