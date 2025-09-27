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
import { FaGithub, FaLinkedin, FaUserCircle, FaStar, FaCodeBranch, FaExclamationCircle, FaProjectDiagram } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { firestore, firebaseApp } from "@/context/firebase";

export default function UserProfile() {
  const db = getFirestore(firebaseApp);
  const { isSignedIn, user: clerkUser, isLoaded } = useUser();

  
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

  
  useEffect(() => {
    
    if (!profile) {
      const savedData = localStorage.getItem("userProfileForm");
      if (savedData) {
        setProfileData(JSON.parse(savedData));
      }
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("userProfileForm", JSON.stringify(profileData));
  }, [profileData]);

  
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

  
  useEffect(() => {
    const get_data = async () => {
      if (!profile?.fullName) return;

      try {
      
        
        const collectionRef = collection(firestore, "userProfile");
        const q = query(collectionRef, where("name", "==", profile.fullName));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) =>
          results.push({ id: doc.id, ...doc.data() })
        );

        
        

        
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

  const deleteProfile = async () => {
    localStorage.removeItem("userProfile");
    setProfile(null);
    setYourProjects([]);
    setContributingProjects([]);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedProfile = {
      ...profileData,
      skills: profileData.skills.split(",").map((s) => s.trim()),
    };
    setProfile(formattedProfile);
    await addUserProfile();
    localStorage.removeItem("userProfileForm");  
  };

  if (!isLoaded) {
    return (
      <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="relative min-h-screen bg-grid-small-white/[0.2] bg-neutral-950 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative z-10 text-center">
            <h2 className="text-2xl font-bold">Please Sign In</h2>
            <p className="text-gray-400 mt-2">You need to be signed in to view and create your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-grid-small-white/[0.2] bg-neutral-950 p-4 md:p-8 overflow-y-auto">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-blue-600/50 rounded-full filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-purple-600/50 rounded-full filter blur-3xl opacity-40 animate-float2"></div>

      <div className="relative z-10">
      {!profile ? (
        
        <div className="flex items-center justify-center min-h-[80vh]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Create Your Profile</h2>
              <p className="text-gray-300 mt-2">Let the community know who you are.</p>
            </div>

            <input
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
              type="text"
              placeholder="Full Name"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData({ ...profileData, fullName: e.target.value })
              }
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
                type="text"
                placeholder="College"
                value={profileData.college}
                onChange={(e) =>
                  setProfileData({ ...profileData, college: e.target.value })
                }
                required
              />
              <input
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
                type="text"
                placeholder="Year of Study"
                value={profileData.year}
                onChange={(e) =>
                  setProfileData({ ...profileData, year: e.target.value })
                }
                required
              />
            </div>

            <input
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
              type="text"
              placeholder="Skills (e.g., React, Python, Figma)"
              value={profileData.skills}
              onChange={(e) =>
                setProfileData({ ...profileData, skills: e.target.value })
              }
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
                type="url"
                placeholder="GitHub Profile URL"
                value={profileData.github}
                onChange={(e) =>
                  setProfileData({ ...profileData, github: e.target.value })
                }
                required
              />
              <input
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
                type="url"
                placeholder="LinkedIn Profile URL"
                value={profileData.linkedin}
                onChange={(e) =>
                  setProfileData({ ...profileData, linkedin: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50"
            >
              Save Profile
            </button>
          </form>
        </div>
      ) : (
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <FaUserCircle className="w-24 h-24 text-gray-500" />
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold tracking-tight">{profile.fullName}</h1>
                <p className="text-gray-300 mt-1">
                  {profile.college} · Year {profile.year}
                </p>
                <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors"><FaGithub size={24} /></a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="bg-white/10 text-neutral-300 text-xs font-medium px-3 py-1 rounded-full border border-white/10">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          
          <div className="flex justify-center mb-8">
            <div className="bg-black/30 border border-white/20 rounded-full p-1 flex space-x-1">
              <button
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === "Your projects" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"}`}
                onClick={() => setActiveTab("Your projects")}
              >
                Your Projects
              </button>
              <button
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === "Contributing projects" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"}`}
                onClick={() => setActiveTab("Contributing projects")}
              >
                Contributions
              </button>
            </div>
          </div>

          
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
                  className="bg-white/10 text-neutral-300 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-gray-400 text-sm mb-4 border-t border-white/10 pt-3">
              <span className="flex items-center gap-1"><FaStar /> {project.stars || 0}</span>
              <span className="flex items-center gap-1"><FaCodeBranch /> {project.forks || 0}</span>
              <span className="flex items-center gap-1"><FaProjectDiagram /> {project.prs || 0}</span>
              <span className="flex items-center gap-1"><FaExclamationCircle /> {project.open_issues || 0}</span>
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
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
                  className="bg-white/10 text-neutral-300 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-gray-400 text-sm mb-4 border-t border-white/10 pt-3">
              <span className="flex items-center gap-1"><FaStar /> {project.stars || 0}</span>
              <span className="flex items-center gap-1"><FaCodeBranch /> {project.forks || 0}</span>
              <span className="flex items-center gap-1"><FaProjectDiagram /> {project.prs || 0}</span>
              <span className="flex items-center gap-1"><FaExclamationCircle /> {project.open_issues || 0}</span>
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
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
            className="mt-8 bg-red-600/50 hover:bg-red-600/80 text-white px-4 py-2 rounded-xl transition-colors text-sm"
          >
            Delete Profile
          </button>
        </div>
      )}
      </div>
    </main>
  );
}
