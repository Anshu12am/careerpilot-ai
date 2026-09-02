const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
  userId:{
   type: mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
  },
  title:{
    type:String,
    required:true,
    default: "Untitled Resume",
  },
  resumeData:{
    PersonalInfo:{
      name: String,
      email: String,
      phone: String,
      address: String,
      linkedin: String,
      website: String,
      summary: String,
    },
    education:[
      {
        school: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
      }
    ],
    experience:[
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
      }
    ],
    skills:[],
    projects:[
      {
         projectName: String,
         technologies: String,
         description: String,
         link: String,
      }
    ]
  },
  atsAnalysis:{
     atsScore:{
      type:Number,
      default:0
     },
     keywordMatch:{
      type:Number,
      default:0
     },
     matchedKeywords:[{ type: String }],
     missingKeywords:[{ type: String }],
     strengths:[{ type: String }],
     weaknesses:[{ type: String }],
     suggestions:[{ type: String }]
  },
  
},{
    timestamps:true
  })

module.exports = mongoose.model("Resume",resumeSchema)