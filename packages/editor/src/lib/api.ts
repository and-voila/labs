export class API {
  public static uploadImage = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return '../../../../apps/ai/public/post-placeholder.jpg';
  };
}

export default API;
