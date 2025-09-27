"use client";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, firebaseApp } from "@/context/firebase";
import { FaGithub, FaLinkedin, FaStar, FaCodeBranch } from "react-icons/fa";
import { GitPullRequest, DollarSign, Code } from "lucide-react";

export default function UserProfile() {
  const db = getFirestore(firebaseApp);

  // --- Profile data state
  const [profileData, setProfileData] = useState({
    fullName: "",
    college: "",
    year: "",
    skills: "",
    github: "",
    linkedin: "",
    degree: "",
    dob: "",
  });

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("Your projects");
  const [yourProjects, setYourProjects] = useState([]);
  const [contributingProjects, setContributingProjects] = useState([]);

  // ✅ Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

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

  // --- Fetch projects
  useEffect(() => {
    const get_data = async () => {
      if (!profile?.fullName) return;

      try {
        const collectionRef = collection(firestore, "userProfile");
        const q = query(collectionRef, where("name", "==", profile.fullName));
        const querySnapshot = await getDocs(q);

        let results = [];
        querySnapshot.forEach((doc) =>
          results.push({ id: doc.id, ...doc.data() })
        );

        if (results[0]?.github_profile) {
          const githubUsername = results[0].github_profile.split("/")[3];

          if (githubUsername) {
            const userProj = [];
            const collectionRef2 = collection(firestore, "entries");
            const q2 = query(collectionRef2, where("author", "==", githubUsername));
            const querySnapshot2 = await getDocs(q2);

            querySnapshot2.forEach((doc) =>
              userProj.push({ id: doc.id, ...doc.data() })
            );

            setYourProjects(userProj);
          }
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    get_data();
  }, [profile]);

  // ✅ Delete project
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(firestore, "entries", projectId));
      setYourProjects((prev) => prev.filter((p) => p.id !== projectId));
      console.log("Deleted project:", projectId);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // --- Delete profile
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
    localStorage.setItem("userProfile", JSON.stringify(formattedProfile)); // ✅ save
    await addUserProfile();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {!profile ? (
        // --- Profile form
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Your Profile
          </h2>

          {/* Inputs */}
          {["Full Name", "College", "Year"].map((label, idx) => (
            <input
              key={idx}
              className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
              type="text"
              placeholder={label}
              value={profileData[label.replace(" ", "").toLowerCase()]}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  [label.replace(" ", "").toLowerCase()]: e.target.value,
                })
              }
              required
            />
          ))}

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

          {/* Tabs */}
          <div className="flex border-b border-gray-600 mb-4">
            {["Your projects", "Contributing projects"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project display */}
          <div className="mt-4">
            {activeTab === "Your projects" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {yourProjects.length > 0 ? (
                  yourProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition flex flex-col justify-between"
                    >
                      <h2 className="text-xl font-bold text-blue-400 mb-2">
                        {project.title || "Untitled Project"}
                      </h2>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                        {project.description || ""}
                      </p>

                      {/* Project stats */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />{" "}
                          {project.stars || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCodeBranch className="text-green-400" />{" "}
                          {project.forks || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitPullRequest size={16} className="text-blue-400" />{" "}
                          {project.prs || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={16} className="text-green-500" />{" "}
                          {project.bounty || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Code size={16} className="text-purple-400" />{" "}
                          {project.language || "Unknown"}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteProject(project.id)}
                        className="mt-4 bg-violet-900 hover:bg-red-700 text-white px-3 py-1 rounded text-sm self-start"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No projects yet.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No contributing projects yet.</p>
            )}
          </div>

          <button
            onClick={deleteProfile}
            className="mt-6 bg-violet-900 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
}
