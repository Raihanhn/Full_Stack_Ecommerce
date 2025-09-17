import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { updateUser } from "@/redux/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || "");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", name);
      formData.append("email", email);
      if (file) formData.append("profileImage", file);

      const { data } = await axios.put("/api/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        dispatch(updateUser(data.user));
        alert("Profile updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Profile Image</label>
          <input type="file" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 rounded-full mt-2 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
