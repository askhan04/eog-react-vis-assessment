import 'isomorphic-fetch';

// function that pings api for drone data and returns response as json or an error object

const findDrone = async () => {
  const response = await fetch(
    `https://react-assessment-api.herokuapp.com/api/drone`
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const json = await response.json();

  return json.data;
};

export default findDrone;
