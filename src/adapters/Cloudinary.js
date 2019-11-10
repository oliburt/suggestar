const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dx4iys6gu/image/upload";
const CLOUDINARY_DESTROY_URL = "https://api.cloudinary.com/v1_1/dx4iys6gu/image/destroy";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const uploadImage = async (e, setImageUrl, setImagePublicId, setLoading) => {
  const files = e.target.files;
  const formData = new FormData();
  formData.append("file", files[0], files[0].name);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  setLoading(true);
  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData
  });

  const file = await res.json();

  setImageUrl(file.secure_url);
  setImagePublicId(file.public_id)
  setLoading(false);
};

const destroyImage = async (imagePublicId, setLoading) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('public_id', imagePublicId)
    const res = await fetch(CLOUDINARY_DESTROY_URL, {
        method: "POST",
        body: formData
    })

    const resDetails = await res.json()
    if (resDetails.result === 'ok') {
        setLoading(false)
        return resDetails
    } else {
        return resDetails
    }
}

export default {
    uploadImage,
    destroyImage
};
