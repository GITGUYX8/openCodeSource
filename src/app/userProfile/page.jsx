"use client";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { firestore, firebaseApp } from "@/context/firebase";

export default function UserProfile() {
  const db = getFirestore(firebaseApp);

  // --- Profile data state
  const [profileData, setProfileData] = useState({
    fullName: "",
    college: "",
    year: "",
    skills: "", // make it a string for text input
    github: "",
    linkedin: "",
    degree: "",
    dob: "",
  });

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("Your projects");
  const [yourProjects, setYourProjects] = useState([]);
  const [contributingProjects, setContributingProjects] = useState([]);

  // --- Add profile to Firestore
  const addUserProfile = async () => {
    const userProfile = {
      College: profileData.college,
      DOB: profileData.dob,
      Degree: profileData.degree,
      github_profile: profileData.github,
      linkedin_profile: profileData.linkedin,
      Skills: profileData.skills.split(",").map((s) => s.trim()),
      Year: profileData.year,
      name: profileData.fullName,
    };

    try {
      const ref = await addDoc(collection(db, "userProfile"), userProfile);
      console.log("Profile added with ID:", ref.id);
    } catch (err) {
      console.error("Error adding profile:", err);
    }
  };
  const results = [];

  // --- Fetch projects from Firestore
  useEffect(() => {
    const get_data = async () => {
      if (!profile?.fullName) return;

      try {
        // 🔹 Fetch profile-related projects
        
        const collectionRef = collection(firestore, "userProfile");
        const q = query(collectionRef, where("name", "==", profile.fullName));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) =>
          results.push({ id: doc.id, ...doc.data() })
        );

        
        

        // 🔹 If GitHub is available, fetch projects from entries
        console.log(results[0].github_profile.split("/")    )
        const githubUrl=results[0].github_profile.split("/")[3]

        console.log("GitHub URL:", githubUrl);
        if (githubUrl) {
          const userProj = [];
          const collectionRef2 = collection(firestore, "entries");
          const q2 = query(collectionRef2, where("author", "==", githubUrl));
          const querySnapshot2 = await getDocs(q2);

          querySnapshot2.forEach((doc) =>
            userProj.push({ id: doc.id, ...doc.data() })
          );
          console.log("User Projects:", userProj);

          setYourProjects(userProj);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    get_data();
  }, [profile]);

  // --- Delete local profile
  const deleteProfile = async () => {
    localStorage.removeItem("userProfile");
    setProfile(null);
    setYourProjects([]);
    setContributingProjects([]);
  };

  // --- Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedProfile = {
      ...profileData,
      skills: profileData.skills.split(",").map((s) => s.trim()),
    };
    setProfile(formattedProfile);
    await addUserProfile();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {!profile ? (
        // --- Profile creation form
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Your Profile
          </h2>

          <input
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            type="text"
            placeholder="Full Name"
            value={profileData.fullName}
            onChange={(e) =>
              setProfileData({ ...profileData, fullName: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            type="text"
            placeholder="College"
            value={profileData.college}
            onChange={(e) =>
              setProfileData({ ...profileData, college: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            type="text"
            placeholder="Year"
            value={profileData.year}
            onChange={(e) =>
              setProfileData({ ...profileData, year: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            type="text"
            placeholder="Skills (comma separated)"
            value={profileData.skills}
            onChange={(e) =>
              setProfileData({ ...profileData, skills: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            type="url"
            placeholder="GitHub Profile Link"
            value={profileData.github}
            onChange={(e) =>
              setProfileData({ ...profileData, github: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            type="url"
            placeholder="LinkedIn Profile Link"
            value={profileData.linkedin}
            onChange={(e) =>
              setProfileData({ ...profileData, linkedin: e.target.value })
            
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-200"
          >
            Save Profile
          </button>
        </form>
      ) : (
        // --- Profile display
        <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">{profile.fullName}</h1>
          <p className="text-gray-400 mb-4">
            {profile.college} · Year {profile.year}
          </p>

          <div className="mb-4">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="inline-block bg-blue-900 text-blue-300 text-sm px-2 py-1 rounded-full mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex space-x-4 mb-6">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaGithub size={30} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-200"
              >
                <FaLinkedin size={30} />
              </a>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-600 mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "Your projects"
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("Your projects")}
            >
              Your projects
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Contributing projects"
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("Contributing projects")}
            >
              Contributing projects
            </button>
          </div>

          {/* Project display */}
          <div className="mt-4">
  {activeTab === "Your projects" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {yourProjects.length > 0 ? (
        yourProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4 mb-3">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-full border border-gray-600"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-blue-400">
                  {project.title || "Untitled Project"}
                </h2>
                <p className="text-sm text-gray-400">
                  {project.college || ""} · Year {project.year || ""}
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">
              {project.description || ""}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between text-gray-400 text-sm mb-3">
              <span>⭐ {project.stars || 0}</span>
              <span>🍴 {project.forks || 0}</span>
              <span>🛠 {project.prs || 0}</span>
              <span>🐞 {project.open_issues || 0}</span>
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View on GitHub
              </a>
            )}
            {project.bounty && (
              <span className="text-green-400 font-semibold ml-2">
                {project.bounty}
              </span>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects yet.</p>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contributingProjects.length > 0 ? (
        contributingProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4 mb-3">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-full border border-gray-600"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-blue-400">
                  {project.title || "Untitled Contribution"}
                </h2>
                <p className="text-sm text-gray-400">
                  {project.college || ""} · Year {project.year || ""}
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">
              {project.description || ""}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between text-gray-400 text-sm mb-3">
              <span>⭐ {project.stars || 0}</span>
              <span>🍴 {project.forks || 0}</span>
              <span>🛠 {project.prs || 0}</span>
              <span>🐞 {project.open_issues || 0}</span>
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View on GitHub
              </a>
            )}
            {project.bounty && (
              <span className="text-green-400 font-semibold ml-2">
                {project.bounty}
              </span>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No contributing projects yet.</p>
      )}
    </div>
  )}
</div>


          <button
            onClick={deleteProfile}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
}
