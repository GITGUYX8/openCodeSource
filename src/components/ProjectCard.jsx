
export default function ProjectCard({
    image,
    title,
    description,
    author,
    college,
    year,
    skills,
    bounty,
    stars,
    contributors,
    prs,
    posted,
  }) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all max-w-md">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-48 object-cover" />
  
        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
  
          {/* Author */}
          <div className="flex items-center mt-3">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
              {author.charAt(0)}
            </div>
            <div className="ml-2">
              <p className="font-medium text-gray-800">{author}</p>
              <p className="text-xs text-gray-500">{college} • {year}</p>
            </div>
          </div>
  
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span key={index} className="+00 text-gray-700 text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
  
          {/* Stats */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>⭐ {stars}</span>
            <span>👥 {contributors}</span>
            <span>🔀 {prs}</span>
          </div>
  
          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {bounty}
            </span>
            <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
              View Project
            </a>
          </div>
  
          <p className="text-xs text-gray-400 mt-2">Posted {posted}</p>
        </div>
      </div>
    );
  }
  