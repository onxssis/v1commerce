export async function fetchJson(url: string, ...args: any) {
  try {
    const response = await fetch(url, ...args);

    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType && contentType.indexOf('application/json') !== -1) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (response.ok) {
      return data;
    }

    const error: any = new Error(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    console.log(error, 'err');
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
