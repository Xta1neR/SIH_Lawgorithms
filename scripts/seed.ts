import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding Database...");
 
    // Clear all data
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    // Insert courses
    await db.insert(schema.courses).values([
      { id: 1, title: "History & Evolution", imageSrc: "/constitution.jpeg" },
      { id: 2, title: "Legislature", imageSrc: "/legislature.png" },
      { id: 3, title: "Executive", imageSrc: "/government.png" },
      { id: 4, title: "Judiciary", imageSrc: "/judiciary.png" },
      { id: 5, title: "Fundamental Rights", imageSrc: "/citizens.png" },
      { id: 6, title: "Fundamental Duties", imageSrc: "/parliament.png" },
      { id: 7, title: "Federal Structure & State Relations", imageSrc: "/states.png" },
      { id: 8, title: "Emergency Provisions", imageSrc: "/siren.png" },

    ]);

    // Insert units
    await db.insert(schema.units).values([
      // History and Evolution units
      {
        id: 1,
        title: "What is Constitution",
        description: "History of the Constitution",
        courseId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "Formation & background of Constitution",
        description: "How the Constitution evolved over time",
        courseId: 1,
        order: 2,
      },
      {
        id: 3,
        title: "The Preamble",
        description: "Preamble of the Constitution",
        courseId: 1,
        order: 3,
      },

      // Legislature units
      {
        id: 4,
        title: "What is Legislature",
        description: "Overview of the Legislature",
        courseId: 2,
        order: 1,
      },
      {
        id: 5,
        title: "Introduction to Parliament",
        description: "Overview of the Parliament",
        courseId: 2,
        order: 2,
      },
      {
        id: 6,
        title: "Structure of Parliament",
        description: "Description about the parliaments",
        courseId: 2,
        order: 3,
      },
      {
        id: 7,
        title: "Functions & Powers",
        description: "What powers do the Houses hold ",
        courseId: 2,
        order: 4,
      },

      // Executive units
      {
        id: 8,
        title: "What is Executive",
        description: "Overview of the Executive",
        courseId: 3,
        order: 1,
      },
      {
        id: 9,
        title: "Indian Executive Structure",
        description: "Important figures of Indian Politics",
        courseId: 3,
        order: 2,
      },

      // Judiciary units
      {
        id: 10,
        title: "What is Judiciary",
        description: "Overview of the Judiciary",
        courseId: 4,
        order: 1,
      },
      {
        id: 11,
        title: "Supreme Court",
        description: "Description about the Supreme Court",
        courseId: 4,
        order: 2,
      },
      {
        id: 12,
        title: "High Court",
        description: "Description about the High Court",
        courseId: 4,
        order: 3,
      },
      {
        id: 13,
        title: "District Court",
        description: "Description about the District Court",
        courseId: 4,
        order: 4,
      },

      // Fundamental Rights units
      {
        id: 14,
        title: "What are Fundamental Rights",
        description: "Overview of the Fundamental Rights",
        courseId: 5,
        order: 1,
      },
      {
        id: 15,
        title: "Dive into the Fundamental Rights",
        description: "",
        courseId: 5,
        order: 2,
      },

      // Fundamental Duties
      {
        id: 16,
        title: "What are Fundamental Duties",
        description: "Overview of the Fundamental Duties",
        courseId: 6,
        order: 1,
      },
      {
        id: 17,
        title: "Importance and Impact",
        description: "How these duties contribute to society",
        courseId: 6,
        order:2,
      },

      //Federal Structure and State Relations
      {
        id: 18,
        title: "What is Federal Structure",
        description: "Overview of Federal Structures",
        courseId: 7,
        order:1,
      },
      {
        id: 19,
        title: "Distribution of Powers",
        description: "Powers of States and Union Government",
        courseId: 7,
        order:2,
      },
      {
        id: 20,
        title: "Financial Relations",
        description: "Taxes and Taxpayers",
        courseId: 7,
        order:3,
      },
      {
        id: 21,
        title: "Inter-state Relations",
        description: "Disputes and agreements among states",
        courseId: 7,
        order:4,
      },

      //Emergency Provisons
      {
        id: 22,
        title: "National Emergency",
        description: "Overview of National Emergency",
        courseId: 8,
        order:1,
      },
      {
        id: 23,
        title: "State Emergency",
        description: "Overview of State Emergency",
        courseId: 8,
        order:2,
      },
      {
        id: 24,
        title: "Financial Emergency",
        description: "Overview of Financial Emergency",
        courseId: 8,
        order:3,
      },

    ]);

    // Insert lessons for each unit
    await db.insert(schema.lessons).values([
      // Constitution lessons
      {
        id: 1,
        title: "Introduction to the Constitution",
        description: "Overview of the Constitution's formation",
        unitId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "Significant Events in History",
        description: "Major historical events that shaped the Constitution",
        unitId: 1,
        order: 2,
      },
      {
        id: 3,
        title: "The Preamble",
        description: "Understanding the Preamble and its significance",
        unitId: 2,
        order: 1,
      },
      {
        id: 4,
        title: "Philosophy of the Constitution",
        description:
          "Key philosophies like Sovereignty, Secularism, and Socialism",
        unitId: 2,
        order: 2,
      },
      {
        id: 5,
        title: "Important Constitutional Amendments",
        description:
          "Key amendments such as the 42nd, 44th, and 73rd amendments",
        unitId: 3,
        order: 1,
      },
      {
        id: 6,
        title: "Key Acts in Indian Constitution",
        description:
          "Overview of important acts like RTI, RTE, and the anti-defection law",
        unitId: 3,
        order: 2,
      },

      // Judiciary lessons
      {
        id: 7,
        title: "Formation of the Supreme Court",
        description: "The formation and evolution of the Supreme Court",
        unitId: 4,
        order: 1,
      },
      {
        id: 8,
        title: "Supreme Court Jurisdiction",
        description:
          "Understanding the original, appellate, and advisory jurisdiction",
        unitId: 4,
        order: 2,
      },
      {
        id: 9,
        title: "Role of High Court",
        description: "Functions and powers of the High Court",
        unitId: 5,
        order: 1,
      },
      {
        id: 10,
        title: "Judicial Review and Public Interest Litigation",
        description: "How High Courts handle judicial review and PILs",
        unitId: 5,
        order: 2,
      },
      {
        id: 11,
        title: "Powers of the Chief Justice of India",
        description: "Roles and powers of the CJI in India",
        unitId: 6,
        order: 1,
      },
      {
        id: 12,
        title: "Important Judicial Cases",
        description:
          "Landmark cases such as Kesavananda Bharati, Maneka Gandhi, and more",
        unitId: 6,
        order: 2,
      },

      // Government lessons
      {
        id: 13,
        title: "Structure of the Central Government",
        description:
          "How the central government operates and its key functions",
        unitId: 8,
        order: 1,
      },
      {
        id: 14,
        title: "Powers of the Executive",
        description: "Exploring the powers of the President and Prime Minister",
        unitId: 8,
        order: 2,
      },
      {
        id: 15,
        title: "State Government and Federalism",
        description:
          "State government structure and its relation to the central government",
        unitId: 9,
        order: 1,
      },
      {
        id: 16,
        title: "Dispute Resolution Between States",
        description:
          "Mechanisms to resolve disputes between states, such as the Interstate Council",
        unitId: 9,
        order: 2,
      },

      // States & UTs lessons
      {
        id: 17,
        title: "Common Acts Across States",
        description:
          "Understanding common acts applied across states, such as labor and land acts",
        unitId: 10,
        order: 1,
      },
      {
        id: 18,
        title: "Special Acts for States",
        description:
          "Special provisions for states like Jammu & Kashmir, Nagaland, and more",
        unitId: 11,
        order: 1,
      },

      // Citizens lessons
      {
        id: 19,
        title: "Fundamental Rights",
        description:
          "An in-depth look at the fundamental rights guaranteed by the Constitution",
        unitId: 12,
        order: 1,
      },
      {
        id: 20,
        title: "Fundamental Duties",
        description:
          "Understanding the duties every Indian citizen must follow",
        unitId: 13,
        order: 1,
      },
      {
        id: 21,
        title: "Right to Equality and Reservation",
        description:
          "Exploring reservation policies and debates around equality",
        unitId: 13,
        order: 2,
      },

      // Parliament lessons
      {
        id: 22,
        title: "History of the Indian Parliament",
        description: "The evolution and history of India's Parliament",
        unitId: 14,
        order: 1,
      },
      {
        id: 23,
        title: "Role of the President",
        description: "Understanding the President's role in the government",
        unitId: 15,
        order: 1,
      },
      {
        id: 24,
        title: "Lok Sabha and Rajya Sabha Powers",
        description: "Powers and roles of the two houses of Parliament",
        unitId: 16,
        order: 1,
      },
      {
        id: 25,
        title: "Election Acts and Reforms",
        description: "Understanding electoral reforms and key election laws",
        unitId: 16,
        order: 2,
      },
    ]);

    await db.insert(schema.challenges).values([
      // Constitution Lesson Challenges
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        question: "When was the Constitution of India adopted?",
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        question: "Which body was responsible for drafting the Constitution?",
        order: 2,
      },

      {
        id: 3,
        lessonId: 2,
        type: "SELECT",
        question:
          "What is the significance of the year 1950 in Indian history?",
        order: 1,
      },
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        question: "Which event marked the start of constitutional amendments?",
        order: 2,
      },

      {
        id: 5,
        lessonId: 3,
        type: "SELECT",
        question: "What does the Preamble of the Constitution emphasize?",
        order: 1,
      },
      {
        id: 6,
        lessonId: 3,
        type: "SELECT",
        question:
          "Which of the following is NOT a feature of the Indian Preamble?",
        order: 2,
      },

      {
        id: 7,
        lessonId: 4,
        type: "SELECT",
        question:
          "Which key philosophy is associated with the term 'Secularism'?",
        order: 1,
      },
      {
        id: 8,
        lessonId: 4,
        type: "SELECT",
        question: "Which word was added to the Preamble by the 42nd Amendment?",
        order: 2,
      },

      {
        id: 9,
        lessonId: 5,
        type: "SELECT",
        question: "Which amendment is known as the 'Mini-Constitution'?",
        order: 1,
      },
      {
        id: 10,
        lessonId: 5,
        type: "SELECT",
        question: "What was the purpose of the 73rd Constitutional Amendment?",
        order: 2,
      },

      {
        id: 11,
        lessonId: 6,
        type: "SELECT",
        question: "Which act allows citizens access to government information?",
        order: 1,
      },
      {
        id: 12,
        lessonId: 6,
        type: "SELECT",
        question: "What does the RTE Act guarantee to every child?",
        order: 2,
      },

      // Judiciary Lesson Challenges
      {
        id: 13,
        lessonId: 7,
        type: "SELECT",
        question: "In which year was the Supreme Court of India established?",
        order: 1,
      },
      {
        id: 14,
        lessonId: 7,
        type: "SELECT",
        question: "Who was the first Chief Justice of India?",
        order: 2,
      },

      {
        id: 15,
        lessonId: 8,
        type: "SELECT",
        question:
          "Which type of jurisdiction allows the Supreme Court to hear disputes between states?",
        order: 1,
      },
      {
        id: 16,
        lessonId: 8,
        type: "SELECT",
        question: "What is the advisory role of the Supreme Court called?",
        order: 2,
      },

      {
        id: 17,
        lessonId: 9,
        type: "SELECT",
        question: "How many High Courts are there in India?",
        order: 1,
      },
      {
        id: 18,
        lessonId: 9,
        type: "SELECT",
        question:
          "Which article of the Constitution deals with the establishment of High Courts?",
        order: 2,
      },

      {
        id: 19,
        lessonId: 10,
        type: "SELECT",
        question:
          "What is the primary function of Public Interest Litigation (PIL)?",
        order: 1,
      },
      {
        id: 20,
        lessonId: 10,
        type: "SELECT",
        question:
          "Which case is a landmark example of judicial review in India?",
        order: 2,
      },

      {
        id: 21,
        lessonId: 11,
        type: "SELECT",
        question: "Who appoints the Chief Justice of India?",
        order: 1,
      },
      {
        id: 22,
        lessonId: 11,
        type: "SELECT",
        question:
          "What is the primary responsibility of the Chief Justice of India?",
        order: 2,
      },

      {
        id: 23,
        lessonId: 12,
        type: "SELECT",
        question: "Which landmark case defined the 'Basic Structure' doctrine?",
        order: 1,
      },
      {
        id: 24,
        lessonId: 12,
        type: "SELECT",
        question: "Which case expanded the right to personal liberty in India?",
        order: 2,
      },

      // Government Lesson Challenges
      {
        id: 25,
        lessonId: 13,
        type: "SELECT",
        question: "Who is the head of the Central Government of India?",
        order: 1,
      },
      {
        id: 26,
        lessonId: 13,
        type: "SELECT",
        question: "Which ministry is responsible for foreign affairs in India?",
        order: 2,
      },

      {
        id: 27,
        lessonId: 14,
        type: "SELECT",
        question: "What is the tenure of the President of India?",
        order: 1,
      },
      {
        id: 28,
        lessonId: 14,
        type: "SELECT",
        question: "Who holds the real executive power in India?",
        order: 2,
      },

      {
        id: 29,
        lessonId: 15,
        type: "SELECT",
        question:
          "Which article of the Constitution deals with state governments?",
        order: 1,
      },
      {
        id: 30,
        lessonId: 15,
        type: "SELECT",
        question: "How many states does India currently have?",
        order: 2,
      },

      {
        id: 31,
        lessonId: 16,
        type: "SELECT",
        question: "Which body resolves disputes between states in India?",
        order: 1,
      },
      {
        id: 32,
        lessonId: 16,
        type: "SELECT",
        question: "What is the role of the Interstate Council in India?",
        order: 2,
      },

      // States & UTs Lesson Challenges
      {
        id: 33,
        lessonId: 17,
        type: "SELECT",
        question: "Which act governs land acquisition across all states?",
        order: 1,
      },
      {
        id: 34,
        lessonId: 17,
        type: "SELECT",
        question: "Which act regulates labor rights across states?",
        order: 2,
      },

      {
        id: 35,
        lessonId: 18,
        type: "SELECT",
        question: "Which article provides special status to Jammu and Kashmir?",
        order: 1,
      },
      {
        id: 36,
        lessonId: 18,
        type: "SELECT",
        question: "Which state has special autonomy under Article 371?",
        order: 2,
      },

      // Citizens Lesson Challenges
      {
        id: 37,
        lessonId: 19,
        type: "SELECT",
        question: "Which article guarantees the Right to Freedom?",
        order: 1,
      },
      {
        id: 38,
        lessonId: 19,
        type: "SELECT",
        question:
          "How many fundamental rights are provided by the Indian Constitution?",
        order: 2,
      },

      {
        id: 39,
        lessonId: 20,
        type: "SELECT",
        question: "Which article lists the Fundamental Duties of citizens?",
        order: 1,
      },
      {
        id: 40,
        lessonId: 20,
        type: "SELECT",
        question: "Which is NOT a Fundamental Duty of Indian citizens?",
        order: 2,
      },

      {
        id: 41,
        lessonId: 21,
        type: "SELECT",
        question: "Which article of the Constitution deals with reservations?",
        order: 1,
      },
      {
        id: 42,
        lessonId: 21,
        type: "SELECT",
        question:
          "What percentage of reservations is given to economically weaker sections (EWS)?",
        order: 2,
      },

      // Parliament Lesson Challenges
      {
        id: 43,
        lessonId: 22,
        type: "SELECT",
        question: "In which year was the Indian Parliament established?",
        order: 1,
      },
      {
        id: 44,
        lessonId: 22,
        type: "SELECT",
        question: "Who was the first Speaker of the Lok Sabha?",
        order: 2,
      },

      {
        id: 45,
        lessonId: 23,
        type: "SELECT",
        question: "What is the role of the President in passing a bill?",
        order: 1,
      },
      {
        id: 46,
        lessonId: 23,
        type: "SELECT",
        question: "Who presides over joint sessions of Parliament?",
        order: 2,
      },

      {
        id: 47,
        lessonId: 24,
        type: "SELECT",
        question:
          "Which house of Parliament is known as the 'House of the People'?",
        order: 1,
      },
      {
        id: 48,
        lessonId: 24,
        type: "SELECT",
        question: "How many members are there in the Rajya Sabha?",
        order: 2,
      },

      {
        id: 49,
        lessonId: 25,
        type: "SELECT",
        question: "Which act regulates the conduct of elections in India?",
        order: 1,
      },
      {
        id: 50,
        lessonId: 25,
        type: "SELECT",
        question:
          "What is the minimum age for contesting elections to the Lok Sabha?",
        order: 2,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      //When was the Constitution of India adopted?
      {
        id: 1,
        challengeId: 1,
        text: "26th January 1950",
        imageSrc: "/public/constitution/26Jan1950.jpg",
        audioSrc: "/public/constitution/26Jan1950.mp3",
        correct: true,
      },
      {
        id: 2,
        challengeId: 1,
        text: "15th August 1947",
        imageSrc: "/public/constitution/15Aug1947.jpg",
        audioSrc: "/public/constitution/15Aug1947.mp3",
        correct: false,
      },
      {
        id: 3,
        challengeId: 1,
        text: "26th November 1949",
        imageSrc: "/public/constitution/26Nov1949.jpg",
        audioSrc: "/public/constitution/26Nov1949.mp3",
        correct: false,
      },

      //Which body was responsible for drafting the Constitution?
      {
        id: 4,
        challengeId: 2,
        text: "Constituent Assembly",
        imageSrc: "/public/constitution/constituent_assembly.jpg",
        audioSrc: "/public/constitution/constituent_assembly.mp3",
        correct: true,
      },
      {
        id: 5,
        challengeId: 2,
        text: "Legislative Assembly",
        imageSrc: "/public/constitution/legislative_assembly.jpg",
        audioSrc: "/public/constitution/legislative_assembly.mp3",
        correct: false,
      },
      {
        id: 6,
        challengeId: 2,
        text: "Parliament",
        imageSrc: "/public/constitution/parliament.jpg",
        audioSrc: "/public/constitution/parliament.mp3",
        correct: false,
      },

      // What is the significance of the year 1950 in Indian history?
      {
        id: 7,
        challengeId: 3,
        text: "Year of adoption of the Constitution",
        imageSrc: "/public/constitution/adoption_year.jpg",
        audioSrc: "/public/constitution/adoption_year.mp3",
        correct: true,
      },
      {
        id: 8,
        challengeId: 3,
        text: "Year of India's independence",
        imageSrc: "/public/constitution/independence_year.jpg",
        audioSrc: "/public/constitution/independence_year.mp3",
        correct: false,
      },
      {
        id: 9,
        challengeId: 3,
        text: "Year of the first general election",
        imageSrc: "/public/constitution/election_year.jpg",
        audioSrc: "/public/constitution/election_year.mp3",
        correct: false,
      },
      // Which event marked the start of constitutional amendments?
      {
        id: 10,
        challengeId: 4,
        text: "The First Amendment Act of 1951",
        imageSrc: "/public/constitution/first_amendment.jpg",
        audioSrc: "/public/constitution/first_amendment.mp3",
        correct: true,
      },
      {
        id: 11,
        challengeId: 4,
        text: "The 42nd Amendment Act of 1976",
        imageSrc: "/public/constitution/forty_second_amendment.jpg",
        audioSrc: "/public/constitution/forty_second_amendment.mp3",
        correct: false,
      },
      {
        id: 12,
        challengeId: 4,
        text: "The 73rd Amendment Act of 1992",
        imageSrc: "/public/constitution/seventy_third_amendment.jpg",
        audioSrc: "/public/constitution/seventy_third_amendment.mp3",
        correct: false,
      },
      // Challenge 7: Which key philosophy is associated with the term 'Secularism'?
      {
        id: 13,
        challengeId: 7,
        text: "Secularism",
        imageSrc: "public/constitution/secularism.png",
        audioSrc: "public/constitution/secularism.mp3",
        correct: true,
      },
      {
        id: 14,
        challengeId: 7,
        text: "Federalism",
        imageSrc: "public/constitution/federalism.png",
        audioSrc: "public/constitution/federalism.mp3",
        correct: false,
      },
      {
        id: 15,
        challengeId: 7,
        text: "Socialism",
        imageSrc: "public/constitution/socialism.png",
        audioSrc: "public/constitution/socialism.mp3",
        correct: false,
      },

      // Challenge 8: Which word was added to the Preamble by the 42nd Amendment?
      {
        id: 16,
        challengeId: 8,
        text: "Secular",
        imageSrc: "public/constitution/secular.png",
        audioSrc: "public/constitution/secular.mp3",
        correct: true,
      },
      {
        id: 17,
        challengeId: 8,
        text: "Democratic",
        imageSrc: "public/constitution/democratic.png",
        audioSrc: "public/constitution/democratic.mp3",
        correct: false,
      },
      {
        id: 18,
        challengeId: 8,
        text: "Sovereign",
        imageSrc: "public/constitution/sovereign.png",
        audioSrc: "public/constitution/sovereign.mp3",
        correct: false,
      },

      // Challenge 9: Which amendment is known as the 'Mini-Constitution'?
      {
        id: 19,
        challengeId: 9,
        text: "42nd Amendment",
        imageSrc: "public/constitution/42nd_amendment.png",
        audioSrc: "public/constitution/42nd_amendment.mp3",
        correct: true,
      },
      {
        id: 20,
        challengeId: 9,
        text: "44th Amendment",
        imageSrc: "public/constitution/44th_amendment.png",
        audioSrc: "public/constitution/44th_amendment.mp3",
        correct: false,
      },
      {
        id: 21,
        challengeId: 9,
        text: "46th Amendment",
        imageSrc: "public/constitution/46th_amendment.png",
        audioSrc: "public/constitution/46th_amendment.mp3",
        correct: false,
      },
      // Challenge 10: What was the purpose of the 73rd Constitutional Amendment?
      {
        id: 22,
        challengeId: 10,
        text: "Empowering local self-government",
        imageSrc: "public/constitution/73rd_amendment.png",
        audioSrc: "public/constitution/73rd_amendment.mp3",
        correct: true,
      },
      {
        id: 23,
        challengeId: 10,
        text: "Introducing reservation policies",
        imageSrc: "public/constitution/reservation_policies.png",
        audioSrc: "public/constitution/reservation_policies.mp3",
        correct: false,
      },
      {
        id: 24,
        challengeId: 10,
        text: "Reforming the judiciary",
        imageSrc: "public/constitution/judiciary_reform.png",
        audioSrc: "public/constitution/judiciary_reform.mp3",
        correct: false,
      },

      // Challenge 11: Which act allows citizens access to government information?
      {
        id: 25,
        challengeId: 11,
        text: "Right to Information Act",
        imageSrc: "public/constitution/rti_act.png",
        audioSrc: "public/constitution/rti_act.mp3",
        correct: true,
      },
      {
        id: 26,
        challengeId: 11,
        text: "Protection of Human Rights Act",
        imageSrc: "public/constitution/hr_act.png",
        audioSrc: "public/constitution/hr_act.mp3",
        correct: false,
      },
      {
        id: 27,
        challengeId: 11,
        text: "Consumer Protection Act",
        imageSrc: "public/constitution/consumer_protection.png",
        audioSrc: "public/constitution/consumer_protection.mp3",
        correct: false,
      },

      // Challenge 12: What does the RTE Act guarantee to every child?
      {
        id: 28,
        challengeId: 12,
        text: "Free and compulsory education",
        imageSrc: "public/constitution/rte_act.png",
        audioSrc: "public/constitution/rte_act.mp3",
        correct: true,
      },
      {
        id: 29,
        challengeId: 12,
        text: "Health care services",
        imageSrc: "public/constitution/health_care.png",
        audioSrc: "public/constitution/health_care.mp3",
        correct: false,
      },
      {
        id: 30,
        challengeId: 12,
        text: "Nutritional support",
        imageSrc: "public/constitution/nutritional_support.png",
        audioSrc: "public/constitution/nutritional_support.mp3",
        correct: false,
      },
      // Challenge 13: In which year was the Supreme Court of India established?
      {
        id: 31,
        challengeId: 13,
        text: "1950",
        imageSrc: "public/judiciary/supreme_court_establishment.png",
        audioSrc: "public/judiciary/supreme_court_establishment.mp3",
        correct: true,
      },
      {
        id: 32,
        challengeId: 13,
        text: "1947",
        imageSrc: "public/judiciary/supreme_court_1947.png",
        audioSrc: "public/judiciary/supreme_court_1947.mp3",
        correct: false,
      },
      {
        id: 33,
        challengeId: 13,
        text: "1960",
        imageSrc: "public/judiciary/supreme_court_1960.png",
        audioSrc: "public/judiciary/supreme_court_1960.mp3",
        correct: false,
      },

      // Challenge 14: Who was the first Chief Justice of India?
      {
        id: 34,
        challengeId: 14,
        text: "Harilal Jekisundas Kania",
        imageSrc: "public/judiciary/first_cj.png",
        audioSrc: "public/judiciary/first_cj.mp3",
        correct: true,
      },
      {
        id: 35,
        challengeId: 14,
        text: "M. Hidayatullah",
        imageSrc: "public/judiciary/m_hidayatullah.png",
        audioSrc: "public/judiciary/m_hidayatullah.mp3",
        correct: false,
      },
      {
        id: 36,
        challengeId: 14,
        text: "P. N. Bhagwati",
        imageSrc: "public/judiciary/p_n_bhagwati.png",
        audioSrc: "public/judiciary/p_n_bhagwati.mp3",
        correct: false,
      },

      // Challenge 15: Which type of jurisdiction allows the Supreme Court to hear disputes between states?
      {
        id: 37,
        challengeId: 15,
        text: "Original Jurisdiction",
        imageSrc: "public/judiciary/original_jurisdiction.png",
        audioSrc: "public/judiciary/original_jurisdiction.mp3",
        correct: true,
      },
      {
        id: 38,
        challengeId: 15,
        text: "Appellate Jurisdiction",
        imageSrc: "public/judiciary/appellate_jurisdiction.png",
        audioSrc: "public/judiciary/appellate_jurisdiction.mp3",
        correct: false,
      },
      {
        id: 39,
        challengeId: 15,
        text: "Advisory Jurisdiction",
        imageSrc: "public/judiciary/advisory_jurisdiction.png",
        audioSrc: "public/judiciary/advisory_jurisdiction.mp3",
        correct: false,
      },
      // Challenge 16: What is the advisory role of the Supreme Court called?
      {
        id: 40,
        challengeId: 16,
        text: "Advisory Jurisdiction",
        imageSrc: "public/judiciary/advisory_jurisdiction.png",
        audioSrc: "public/judiciary/advisory_jurisdiction.mp3",
        correct: true,
      },
      {
        id: 41,
        challengeId: 16,
        text: "Review Jurisdiction",
        imageSrc: "public/judiciary/review_jurisdiction.png",
        audioSrc: "public/judiciary/review_jurisdiction.mp3",
        correct: false,
      },
      {
        id: 42,
        challengeId: 16,
        text: "Original Jurisdiction",
        imageSrc: "public/judiciary/original_jurisdiction.png",
        audioSrc: "public/judiciary/original_jurisdiction.mp3",
        correct: false,
      },

      // Challenge 17: How many High Courts are there in India?
      {
        id: 43,
        challengeId: 17,
        text: "25",
        imageSrc: "public/judiciary/high_courts_25.png",
        audioSrc: "public/judiciary/high_courts_25.mp3",
        correct: true,
      },
      {
        id: 44,
        challengeId: 17,
        text: "20",
        imageSrc: "public/judiciary/high_courts_20.png",
        audioSrc: "public/judiciary/high_courts_20.mp3",
        correct: false,
      },
      {
        id: 45,
        challengeId: 17,
        text: "30",
        imageSrc: "public/judiciary/high_courts_30.png",
        audioSrc: "public/judiciary/high_courts_30.mp3",
        correct: false,
      },

      // Challenge 18: Which article of the Constitution deals with the establishment of High Courts?
      {
        id: 46,
        challengeId: 18,
        text: "Article 214",
        imageSrc: "public/judiciary/article_214.png",
        audioSrc: "public/judiciary/article_214.mp3",
        correct: true,
      },
      {
        id: 47,
        challengeId: 18,
        text: "Article 217",
        imageSrc: "public/judiciary/article_217.png",
        audioSrc: "public/judiciary/article_217.mp3",
        correct: false,
      },
      {
        id: 48,
        challengeId: 18,
        text: "Article 226",
        imageSrc: "public/judiciary/article_226.png",
        audioSrc: "public/judiciary/article_226.mp3",
        correct: false,
      },
      // Challenge 19: What is the primary function of Public Interest Litigation (PIL)?
      {
        id: 49,
        challengeId: 19,
        text: "To address public grievances and ensure justice",
        imageSrc: "public/judiciary/pil_function.png",
        audioSrc: "public/judiciary/pil_function.mp3",
        correct: true,
      },
      {
        id: 50,
        challengeId: 19,
        text: "To review the constitutional amendments",
        imageSrc: "public/judiciary/pil_review.png",
        audioSrc: "public/judiciary/pil_review.mp3",
        correct: false,
      },
      {
        id: 51,
        challengeId: 19,
        text: "To manage the administrative functions of the government",
        imageSrc: "public/judiciary/pil_administrative.png",
        audioSrc: "public/judiciary/pil_administrative.mp3",
        correct: false,
      },

      // Challenge 20: Which case is a landmark example of judicial review in India?
      {
        id: 52,
        challengeId: 20,
        text: "Kesavananda Bharati v. State of Kerala",
        imageSrc: "public/judiciary/kesavananda_bharati.png",
        audioSrc: "public/judiciary/kesavananda_bharati.mp3",
        correct: true,
      },
      {
        id: 53,
        challengeId: 20,
        text: "Minerva Mills v. Union of India",
        imageSrc: "public/judiciary/minerva_mills.png",
        audioSrc: "public/judiciary/minerva_mills.mp3",
        correct: false,
      },
      {
        id: 54,
        challengeId: 20,
        text: "Golaknath v. State of Punjab",
        imageSrc: "public/judiciary/golaknath.png",
        audioSrc: "public/judiciary/golaknath.mp3",
        correct: false,
      },

      // Challenge 21: Who appoints the Chief Justice of India?
      {
        id: 56,
        challengeId: 21,
        text: "The President of India",
        imageSrc: "public/judiciary/president_appoints.png",
        audioSrc: "public/judiciary/president_appoints.mp3",
        correct: true,
      },
      {
        id: 57,
        challengeId: 21,
        text: "The Prime Minister of India",
        imageSrc: "public/judiciary/prime_minister_appoints.png",
        audioSrc: "public/judiciary/prime_minister_appoints.mp3",
        correct: false,
      },
      {
        id: 58,
        challengeId: 21,
        text: "The Chief Election Commissioner",
        imageSrc: "public/judiciary/election_commissioner.png",
        audioSrc: "public/judiciary/election_commissioner.mp3",
        correct: false,
      },
      // Challenge 22: What is the primary responsibility of the Chief Justice of India?
      {
        id: 59,
        challengeId: 22,
        text: "Head of the judiciary and presiding over Supreme Court",
        imageSrc: "public/judiciary/cji_responsibility.png",
        audioSrc: "public/judiciary/cji_responsibility.mp3",
        correct: true,
      },
      {
        id: 60,
        challengeId: 22,
        text: "Appointing judges to the High Courts",
        imageSrc: "public/judiciary/cji_appoints.png",
        audioSrc: "public/judiciary/cji_appoints.mp3",
        correct: false,
      },
      {
        id: 61,
        challengeId: 22,
        text: "Managing public relations of the Supreme Court",
        imageSrc: "public/judiciary/cji_public_relations.png",
        audioSrc: "public/judiciary/cji_public_relations.mp3",
        correct: false,
      },

      // Challenge 23: Which landmark case defined the 'Basic Structure' doctrine?
      {
        id: 62,
        challengeId: 23,
        text: "Kesavananda Bharati v. State of Kerala",
        imageSrc: "public/judiciary/basic_structure.png",
        audioSrc: "public/judiciary/basic_structure.mp3",
        correct: true,
      },
      {
        id: 63,
        challengeId: 23,
        text: "Golaknath v. State of Punjab",
        imageSrc: "public/judiciary/golaknath.png",
        audioSrc: "public/judiciary/golaknath.mp3",
        correct: false,
      },
      {
        id: 64,
        challengeId: 23,
        text: "Minerva Mills v. Union of India",
        imageSrc: "public/judiciary/minerva_mills.png",
        audioSrc: "public/judiciary/minerva_mills.mp3",
        correct: false,
      },

      // Challenge 24: Which case expanded the right to personal liberty in India?
      {
        id: 65,
        challengeId: 24,
        text: "Maneka Gandhi v. Union of India",
        imageSrc: "public/judiciary/maneka_gandhi.png",
        audioSrc: "public/judiciary/maneka_gandhi.mp3",
        correct: true,
      },
      {
        id: 66,
        challengeId: 24,
        text: "A.K. Gopalan v. State of Madras",
        imageSrc: "public/judiciary/ak_gopalan.png",
        audioSrc: "public/judiciary/ak_gopalan.mp3",
        correct: false,
      },
      {
        id: 67,
        challengeId: 24,
        text: "R.C. Cooper v. Union of India",
        imageSrc: "public/judiciary/rc_cooper.png",
        audioSrc: "public/judiciary/rc_cooper.mp3",
        correct: false,
      },
      // Challenge 25: Who is the head of the Central Government of India?
      {
        id: 68,
        challengeId: 25,
        text: "Prime Minister",
        imageSrc: "public/government/prime_minister.png",
        audioSrc: "public/government/prime_minister.mp3",
        correct: true,
      },
      {
        id: 69,
        challengeId: 25,
        text: "President",
        imageSrc: "public/government/president.png",
        audioSrc: "public/government/president.mp3",
        correct: false,
      },
      {
        id: 70,
        challengeId: 25,
        text: "Vice President",
        imageSrc: "public/government/vice_president.png",
        audioSrc: "public/government/vice_president.mp3",
        correct: false,
      },

      // Challenge 26: Which ministry is responsible for foreign affairs in India?
      {
        id: 71,
        challengeId: 26,
        text: "Ministry of External Affairs",
        imageSrc: "public/government/external_affairs.png",
        audioSrc: "public/government/external_affairs.mp3",
        correct: true,
      },
      {
        id: 72,
        challengeId: 26,
        text: "Ministry of Home Affairs",
        imageSrc: "public/government/home_affairs.png",
        audioSrc: "public/government/home_affairs.mp3",
        correct: false,
      },
      {
        id: 73,
        challengeId: 26,
        text: "Ministry of Defence",
        imageSrc: "public/government/defence.png",
        audioSrc: "public/government/defence.mp3",
        correct: false,
      },

      // Challenge 27: What is the tenure of the President of India?
      {
        id: 74,
        challengeId: 27,
        text: "5 years",
        imageSrc: "public/government/president_tenure.png",
        audioSrc: "public/government/president_tenure.mp3",
        correct: true,
      },
      {
        id: 75,
        challengeId: 27,
        text: "6 years",
        imageSrc: "public/government/president_6_years.png",
        audioSrc: "public/government/president_6_years.mp3",
        correct: false,
      },
      {
        id: 76,
        challengeId: 27,
        text: "4 years",
        imageSrc: "public/government/president_4_years.png",
        audioSrc: "public/government/president_4_years.mp3",
        correct: false,
      },
      // Challenge 28: Who holds the real executive power in India?
      {
        id: 77,
        challengeId: 28,
        text: "Prime Minister",
        imageSrc: "public/government/prime_minister.png",
        audioSrc: "public/government/prime_minister.mp3",
        correct: true,
      },
      {
        id: 78,
        challengeId: 28,
        text: "President",
        imageSrc: "public/government/president.png",
        audioSrc: "public/government/president.mp3",
        correct: false,
      },
      {
        id: 79,
        challengeId: 28,
        text: "Vice President",
        imageSrc: "public/government/vice_president.png",
        audioSrc: "public/government/vice_president.mp3",
        correct: false,
      },

      // Challenge 29: Which article of the Constitution deals with state governments?
      {
        id: 80,
        challengeId: 29,
        text: "Article 152",
        imageSrc: "public/government/article_152.png",
        audioSrc: "public/government/article_152.mp3",
        correct: false,
      },
      {
        id: 81,
        challengeId: 29,
        text: "Article 246",
        imageSrc: "public/government/article_246.png",
        audioSrc: "public/government/article_246.mp3",
        correct: true,
      },
      {
        id: 82,
        challengeId: 29,
        text: "Article 256",
        imageSrc: "public/government/article_256.png",
        audioSrc: "public/government/article_256.mp3",
        correct: false,
      },

      // Challenge 30: How many states does India currently have?
      {
        id: 83,
        challengeId: 30,
        text: "28",
        imageSrc: "public/government/states_28.png",
        audioSrc: "public/government/states_28.mp3",
        correct: true,
      },
      {
        id: 84,
        challengeId: 30,
        text: "29",
        imageSrc: "public/government/states_29.png",
        audioSrc: "public/government/states_29.mp3",
        correct: false,
      },
      {
        id: 85,
        challengeId: 30,
        text: "27",
        imageSrc: "public/government/states_27.png",
        audioSrc: "public/government/states_27.mp3",
        correct: false,
      },
      // Challenge 31: Which body resolves disputes between states in India?
      {
        id: 86,
        challengeId: 31,
        text: "Supreme Court",
        imageSrc: "public/government/supreme_court.png",
        audioSrc: "public/government/supreme_court.mp3",
        correct: true,
      },
      {
        id: 87,
        challengeId: 31,
        text: "Interstate Council",
        imageSrc: "public/government/interstate_council.png",
        audioSrc: "public/government/interstate_council.mp3",
        correct: false,
      },
      {
        id: 88,
        challengeId: 31,
        text: "Parliament",
        imageSrc: "public/government/parliament.png",
        audioSrc: "public/government/parliament.mp3",
        correct: false,
      },

      // Challenge 32: What is the role of the Interstate Council in India?
      {
        id: 89,
        challengeId: 32,
        text: "Resolve disputes between states",
        imageSrc: "public/government/interstate_council_role.png",
        audioSrc: "public/government/interstate_council_role.mp3",
        correct: false,
      },
      {
        id: 90,
        challengeId: 32,
        text: "Facilitate coordination between the Centre and states",
        imageSrc: "public/government/interstate_council_coordination.png",
        audioSrc: "public/government/interstate_council_coordination.mp3",
        correct: true,
      },
      {
        id: 91,
        challengeId: 32,
        text: "Legislate on state matters",
        imageSrc: "public/government/interstate_council_legislate.png",
        audioSrc: "public/government/interstate_council_legislate.mp3",
        correct: false,
      },

      // Challenge 33: Which act governs land acquisition across all states?
      {
        id: 92,
        challengeId: 33,
        text: "Land Acquisition Act, 1894",
        imageSrc: "public/states_uts/land_acquisition_1894.png",
        audioSrc: "public/states_uts/land_acquisition_1894.mp3",
        correct: false,
      },
      {
        id: 93,
        challengeId: 33,
        text: "Right to Fair Compensation and Transparency in Land Acquisition Act, 2013",
        imageSrc: "public/states_uts/land_acquisition_2013.png",
        audioSrc: "public/states_uts/land_acquisition_2013.mp3",
        correct: true,
      },
      {
        id: 94,
        challengeId: 33,
        text: "National Land Acquisition and Rehabilitation Act",
        imageSrc: "public/states_uts/land_acquisition_rehabilitation.png",
        audioSrc: "public/states_uts/land_acquisition_rehabilitation.mp3",
        correct: false,
      },
      // Challenge 34: Which act regulates labor rights across states?
      {
        id: 95,
        challengeId: 34,
        text: "Industrial Disputes Act, 1947",
        imageSrc: "public/states_uts/industrial_disputes.png",
        audioSrc: "public/states_uts/industrial_disputes.mp3",
        correct: true,
      },
      {
        id: 96,
        challengeId: 34,
        text: "Factories Act, 1948",
        imageSrc: "public/states_uts/factories_act.png",
        audioSrc: "public/states_uts/factories_act.mp3",
        correct: false,
      },
      {
        id: 97,
        challengeId: 34,
        text: "Minimum Wages Act, 1948",
        imageSrc: "public/states_uts/minimum_wages.png",
        audioSrc: "public/states_uts/minimum_wages.mp3",
        correct: false,
      },

      // Challenge 35: Which article provides special status to Jammu and Kashmir?
      {
        id: 98,
        challengeId: 35,
        text: "Article 370",
        imageSrc: "public/states_uts/article_370.png",
        audioSrc: "public/states_uts/article_370.mp3",
        correct: true,
      },
      {
        id: 99,
        challengeId: 35,
        text: "Article 35A",
        imageSrc: "public/states_uts/article_35A.png",
        audioSrc: "public/states_uts/article_35A.mp3",
        correct: false,
      },
      {
        id: 100,
        challengeId: 35,
        text: "Article 371",
        imageSrc: "public/states_uts/article_371.png",
        audioSrc: "public/states_uts/article_371.mp3",
        correct: false,
      },

      // Challenge 36: Which state has special autonomy under Article 371?
      {
        id: 101,
        challengeId: 36,
        text: "Nagaland",
        imageSrc: "public/states_uts/article_371_nagaland.png",
        audioSrc: "public/states_uts/article_371_nagaland.mp3",
        correct: true,
      },
      {
        id: 102,
        challengeId: 36,
        text: "Mizoram",
        imageSrc: "public/states_uts/article_371_mizoram.png",
        audioSrc: "public/states_uts/article_371_mizoram.mp3",
        correct: false,
      },
      {
        id: 103,
        challengeId: 36,
        text: "Sikkim",
        imageSrc: "public/states_uts/article_371_sikkim.png",
        audioSrc: "public/states_uts/article_371_sikkim.mp3",
        correct: false,
      },
      // Challenge 37: Which article guarantees the Right to Freedom?
      {
        id: 104,
        challengeId: 37,
        text: "Article 19",
        imageSrc: "public/citizens/article_19.png",
        audioSrc: "public/citizens/article_19.mp3",
        correct: true,
      },
      {
        id: 105,
        challengeId: 37,
        text: "Article 20",
        imageSrc: "public/citizens/article_20.png",
        audioSrc: "public/citizens/article_20.mp3",
        correct: false,
      },
      {
        id: 106,
        challengeId: 37,
        text: "Article 21",
        imageSrc: "public/citizens/article_21.png",
        audioSrc: "public/citizens/article_21.mp3",
        correct: false,
      },

      // Challenge 38: How many fundamental rights are provided by the Indian Constitution?
      {
        id: 107,
        challengeId: 38,
        text: "Six",
        imageSrc: "public/citizens/six_fundamental_rights.png",
        audioSrc: "public/citizens/six_fundamental_rights.mp3",
        correct: true,
      },
      {
        id: 108,
        challengeId: 38,
        text: "Seven",
        imageSrc: "public/citizens/seven_fundamental_rights.png",
        audioSrc: "public/citizens/seven_fundamental_rights.mp3",
        correct: false,
      },
      {
        id: 109,
        challengeId: 38,
        text: "Eight",
        imageSrc: "public/citizens/eight_fundamental_rights.png",
        audioSrc: "public/citizens/eight_fundamental_rights.mp3",
        correct: false,
      },

      // Challenge 39: Which article lists the Fundamental Duties of citizens?
      {
        id: 110,
        challengeId: 39,
        text: "Article 51A",
        imageSrc: "public/citizens/article_51A.png",
        audioSrc: "public/citizens/article_51A.mp3",
        correct: true,
      },
      {
        id: 111,
        challengeId: 39,
        text: "Article 48A",
        imageSrc: "public/citizens/article_48A.png",
        audioSrc: "public/citizens/article_48A.mp3",
        correct: false,
      },
      {
        id: 112,
        challengeId: 39,
        text: "Article 43",
        imageSrc: "public/citizens/article_43.png",
        audioSrc: "public/citizens/article_43.mp3",
        correct: false,
      },
      // Challenge 40: Which is NOT a Fundamental Duty of Indian citizens?
      {
        id: 113,
        challengeId: 40,
        text: "Right to Vote",
        imageSrc: "public/citizens/right_to_vote.png",
        audioSrc: "public/citizens/right_to_vote.mp3",
        correct: true,
      },
      {
        id: 114,
        challengeId: 40,
        text: "Respect for the Constitution",
        imageSrc: "public/citizens/respect_constitution.png",
        audioSrc: "public/citizens/respect_constitution.mp3",
        correct: false,
      },
      {
        id: 115,
        challengeId: 40,
        text: "Protect the Environment",
        imageSrc: "public/citizens/protect_environment.png",
        audioSrc: "public/citizens/protect_environment.mp3",
        correct: false,
      },

      // Challenge 41: Which article of the Constitution deals with reservations?
      {
        id: 116,
        challengeId: 41,
        text: "Article 15",
        imageSrc: "public/citizens/article_15.png",
        audioSrc: "public/citizens/article_15.mp3",
        correct: true,
      },
      {
        id: 117,
        challengeId: 41,
        text: "Article 16",
        imageSrc: "public/citizens/article_16.png",
        audioSrc: "public/citizens/article_16.mp3",
        correct: false,
      },
      {
        id: 118,
        challengeId: 41,
        text: "Article 17",
        imageSrc: "public/citizens/article_17.png",
        audioSrc: "public/citizens/article_17.mp3",
        correct: false,
      },

      // Challenge 42: What percentage of reservations is given to economically weaker sections (EWS)?
      {
        id: 119,
        challengeId: 42,
        text: "10%",
        imageSrc: "public/citizens/10_percent.png",
        audioSrc: "public/citizens/10_percent.mp3",
        correct: true,
      },
      {
        id: 120,
        challengeId: 42,
        text: "15%",
        imageSrc: "public/citizens/15_percent.png",
        audioSrc: "public/citizens/15_percent.mp3",
        correct: false,
      },
      {
        id: 121,
        challengeId: 42,
        text: "20%",
        imageSrc: "public/citizens/20_percent.png",
        audioSrc: "public/citizens/20_percent.mp3",
        correct: false,
      },
      // Challenge 43: In which year was the Indian Parliament established?
      {
        id: 122,
        challengeId: 43,
        text: "1952",
        imageSrc: "public/parliament/1952.png",
        audioSrc: "public/parliament/1952.mp3",
        correct: true,
      },
      {
        id: 123,
        challengeId: 43,
        text: "1947",
        imageSrc: "public/parliament/1947.png",
        audioSrc: "public/parliament/1947.mp3",
        correct: false,
      },
      {
        id: 124,
        challengeId: 43,
        text: "1960",
        imageSrc: "public/parliament/1960.png",
        audioSrc: "public/parliament/1960.mp3",
        correct: false,
      },

      // Challenge 44: Who was the first Speaker of the Lok Sabha?
      {
        id: 125,
        challengeId: 44,
        text: "Ganesh Vasudev Mavalankar",
        imageSrc: "public/parliament/ganesh_vasudev_mavalankar.png",
        audioSrc: "public/parliament/ganesh_vasudev_mavalankar.mp3",
        correct: true,
      },
      {
        id: 126,
        challengeId: 44,
        text: "Sardar Vallabhbhai Patel",
        imageSrc: "public/parliament/sardar_vallabhbhai_patel.png",
        audioSrc: "public/parliament/sardar_vallabhbhai_patel.mp3",
        correct: false,
      },
      {
        id: 127,
        challengeId: 44,
        text: "Jawaharlal Nehru",
        imageSrc: "public/parliament/jawaharlal_nehru.png",
        audioSrc: "public/parliament/jawaharlal_nehru.mp3",
        correct: false,
      },

      // Challenge 45: What is the role of the President in passing a bill?
      {
        id: 128,
        challengeId: 45,
        text: "Sign the Bill into Law",
        imageSrc: "public/parliament/sign_bill.png",
        audioSrc: "public/parliament/sign_bill.mp3",
        correct: true,
      },
      {
        id: 129,
        challengeId: 45,
        text: "Debate the Bill",
        imageSrc: "public/parliament/debate_bill.png",
        audioSrc: "public/parliament/debate_bill.mp3",
        correct: false,
      },
      {
        id: 130,
        challengeId: 45,
        text: "Draft the Bill",
        imageSrc: "public/parliament/draft_bill.png",
        audioSrc: "public/parliament/draft_bill.mp3",
        correct: false,
      },
      // Challenge 46: Who presides over joint sessions of Parliament?
      {
        id: 131,
        challengeId: 46,
        text: "The Speaker of the Lok Sabha",
        imageSrc: "public/parliament/speaker_lok_sabha.png",
        audioSrc: "public/parliament/speaker_lok_sabha.mp3",
        correct: true,
      },
      {
        id: 132,
        challengeId: 46,
        text: "The President of India",
        imageSrc: "public/parliament/president_india.png",
        audioSrc: "public/parliament/president_india.mp3",
        correct: false,
      },
      {
        id: 133,
        challengeId: 46,
        text: "The Prime Minister of India",
        imageSrc: "public/parliament/prime_minister_india.png",
        audioSrc: "public/parliament/prime_minister_india.mp3",
        correct: false,
      },

      // Challenge 47: Which house of Parliament is known as the 'House of the People'?
      {
        id: 134,
        challengeId: 47,
        text: "Lok Sabha",
        imageSrc: "public/parliament/lok_sabha.png",
        audioSrc: "public/parliament/lok_sabha.mp3",
        correct: true,
      },
      {
        id: 135,
        challengeId: 47,
        text: "Rajya Sabha",
        imageSrc: "public/parliament/rajya_sabha.png",
        audioSrc: "public/parliament/rajya_sabha.mp3",
        correct: false,
      },
      {
        id: 136,
        challengeId: 47,
        text: "The Senate",
        imageSrc: "public/parliament/senate.png",
        audioSrc: "public/parliament/senate.mp3",
        correct: false,
      },

      // Challenge 48: How many members are there in the Rajya Sabha?
      {
        id: 137,
        challengeId: 48,
        text: "245",
        imageSrc: "public/parliament/245_members.png",
        audioSrc: "public/parliament/245_members.mp3",
        correct: true,
      },
      {
        id: 138,
        challengeId: 48,
        text: "275",
        imageSrc: "public/parliament/275_members.png",
        audioSrc: "public/parliament/275_members.mp3",
        correct: false,
      },
      {
        id: 139,
        challengeId: 48,
        text: "300",
        imageSrc: "public/parliament/300_members.png",
        audioSrc: "public/parliament/300_members.mp3",
        correct: false,
      },
      // Challenge 49: Which act regulates the conduct of elections in India?
      {
        id: 140,
        challengeId: 49,
        text: "Representation of the People Act, 1951",
        imageSrc: "public/parliament/representation_people_act.png",
        audioSrc: "public/parliament/representation_people_act.mp3",
        correct: true,
      },
      {
        id: 141,
        challengeId: 49,
        text: "Election Commission Act, 1950",
        imageSrc: "public/parliament/election_commission_act.png",
        audioSrc: "public/parliament/election_commission_act.mp3",
        correct: false,
      },
      {
        id: 142,
        challengeId: 49,
        text: "People's Representation Act, 1952",
        imageSrc: "public/parliament/peoples_representation_act.png",
        audioSrc: "public/parliament/peoples_representation_act.mp3",
        correct: false,
      },

      // Challenge 50: What is the minimum age for contesting elections to the Lok Sabha?
      {
        id: 143,
        challengeId: 50,
        text: "25 years",
        imageSrc: "public/parliament/25_years.png",
        audioSrc: "public/parliament/25_years.mp3",
        correct: true,
      },
      {
        id: 144,
        challengeId: 50,
        text: "30 years",
        imageSrc: "public/parliament/30_years.png",
        audioSrc: "public/parliament/30_years.mp3",
        correct: false,
      },
      {
        id: 145,
        challengeId: 50,
        text: "35 years",
        imageSrc: "public/parliament/35_years.png",
        audioSrc: "public/parliament/35_years.mp3",
        correct: false,
      },
      {
        id: 146,
        challengeId: 5,
        text: "The Preamble emphasizes the Sovereign nature of the Indian Republic.",
        imageSrc: "",
        audioSrc: "",
        correct: true,
      },
      {
        id: 147,
        challengeId: 5,
        text: "The Preamble emphasizes the importance of Fundamental Rights.",
        imageSrc: "",
        audioSrc: "",
        correct: false,
      },
      {
        id: 148,
        challengeId: 5,
        text: "The Preamble emphasizes the role of the Prime Minister.",
        imageSrc: "",
        audioSrc: "",
        correct: false,
      },
      {
        id: 149,
        challengeId: 6,
        text: "Sovereign",
        imageSrc: "",
        audioSrc: "",
        correct: false,
      },
      {
        id: 150,
        challengeId: 6,
        text: "Secular",
        imageSrc: "",
        audioSrc: "",
        correct: false,
      },
      {
        id: 151,
        challengeId: 6,
        text: "Monarchist",
        imageSrc: "",
        audioSrc: "",
        correct: true,
      },
      
    ]);

    console.log("Seeding finished successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw new Error("Failed to seed the database");
  }
};

main();
