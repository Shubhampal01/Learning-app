import React from 'react'

function Testimonial() {
    const testimonialsData = [
        {
          id: 1,
          name: "John Doe",
          position: "Student",
          message:
            "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
          image:
            "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        },
        {
          id: 2,
          name: "Jane Smith",
          position: "Student",
          message:
            "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
          image:
            "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
        {
          id: 3,
          name: "John Doe",
          position: "Student",
          message:
            "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
          image:
            "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        },
        {
          id: 4,
          name: "Jane Smith",
          position: "Student",
          message:
            "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
          image:
            "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
      ]; 

  return (
    <section className='py-20 bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50'>
        <h2 className='text-4xl font-bold text-violet-600 text-center my-5'>What our students say</h2>
        <div className="testimonial-cards flex overflow-auto no-scrollbar">
            {testimonialsData.map((testimonial) => (
                <div className="testimonial-card bg-white shadow-lg rounded-lg 
                p-6 m-4 max-w-80 text-center flex flex-col items-center space-y-4"
                key={testimonial.id} > 
                    <div className="testimonial-header flex items-center justify-between mb-4">
                        <div className="testimonial-image w-16 h-16 rounded-full overflow-hidden">
                            <img src={testimonial.image} alt="Person's Name" className="object-cover w-full h-full" />
                        </div>
                        <div className="testimonial-info px-2">
                            <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                            <p className="text-blue-500 text-sm">{testimonial.position}</p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic text-sm md:text-base">{testimonial.message}</p>
              </div>
              
            ))}
        </div>

    </section>
  )
}

export default Testimonial