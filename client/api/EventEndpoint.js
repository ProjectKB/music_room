import axios from 'axios';


export const ReadAllEvents = async (setter, query) => {
  try {
    const response = await axios.post(
      global.URL + '/events/searchEvent',
      JSON.stringify(query),
    );

    response.data != null ? setter(response.data) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
