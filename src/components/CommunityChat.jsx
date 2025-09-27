 "use client";
 
 import { useState, useEffect } from "react";
 import { getFirestore, doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
 import { useUser } from "@clerk/nextjs";
 import { firebaseApp } from "@/context/firebase";
 
 const firestore = getFirestore(firebaseApp);
 
 export default function CommunityChat({ projectId }) {
   const { user } = useUser(); // Get the current logged-in user from Clerk
   const [comments, setComments] = useState([
     {
       author: "Alice",
       text: "This looks like a great project to contribute to! The AI summary is super helpful.",
       timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 15) } // 15 minutes ago
     },
     {
       author: "Bob",
       text: "I agree! I'm looking at the 'good first issue' labels on GitHub right now. The PR templates will be useful.",
       timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 8) } // 8 minutes ago
     }
   ]);
   const [newComment, setNewComment] = useState("");
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     if (!projectId) return;
 
     const projectRef = doc(firestore, "entries", projectId);
 
     // Listen for real-time updates on the project document
     const unsubscribe = onSnapshot(projectRef, (doc) => {
       if (doc.exists()) {
         const firestoreComments = doc.data().comments || [];
         if (firestoreComments.length > 0) {
           setComments(firestoreComments);
         }
       } else {
         console.log("No such document!");
       }
       setLoading(false);
     });
 
     // Cleanup subscription on unmount
     return () => unsubscribe();
   }, [projectId]);
 
   const handlePostComment = async (e) => {
     e.preventDefault();
     if (!newComment.trim() || !user || !projectId) return;
 
     const projectRef = doc(firestore, "entries", projectId);
 
     const commentData = {
       text: newComment,
       author: user.displayName || "Anonymous",
       authorId: user.uid,
       timestamp: new Date(),
     };
 
     try {
       await updateDoc(projectRef, {
         comments: arrayUnion(commentData),
       });
       setNewComment("");
     } catch (error) {
       console.error("Error posting comment:", error);
     }
   };
 
   if (loading) {
     return <p className="text-center text-zinc-400">Loading comments...</p>;
   }
 
   return (
     <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 p-6">
       <h2 className="text-xl font-semibold mb-4">Community Discussion</h2>
       <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
         {comments.length > 0 ? (
           comments
             .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
             .map((comment, index) => (
               <div key={index} className="flex items-start gap-3">
                 <div className="h-9 w-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-bold shrink-0 border border-white/10">
                   {comment.author.charAt(0)}
                 </div>
                 <div className="bg-black/20 p-3 rounded-lg w-full">
                   <div className="flex justify-between items-center">
                     <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                       {comment.author}
                     </p>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400">
                       {new Date(comment.timestamp.toDate()).toLocaleString()}
                     </p>
                   </div>
                   <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                     {comment.text}
                   </p>
                 </div>
               </div>
             ))
         ) : (
           <p className="text-zinc-500 text-center py-4">
             No comments yet. Be the first to start a discussion!
           </p>
         )}
       </div>
 
       {user ? (
         <form onSubmit={handlePostComment} className="flex gap-3 mt-4 pt-4 border-t border-white/10">
           <input
             value={newComment}
             onChange={(e) => setNewComment(e.target.value)}
             className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
             placeholder="Leave a comment..."
           />
           <button
             type="submit"
             className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors disabled:bg-zinc-500"
             disabled={!newComment.trim()}
           >
             Post
           </button>
         </form>
       ) : (
         <p className="text-center text-zinc-500 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
           Please log in to leave a comment.
         </p>
       )}
     </div>
   );
 }
 