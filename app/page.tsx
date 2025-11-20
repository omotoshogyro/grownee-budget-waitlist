"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const [error, setError] = useState(""); // Add error state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // ... rest of your useEffect and faqs code ...

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in-view");
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll(".scroll-animate");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "What is Grownee?",
      answer:
        "Grownee is your ultimate finance companion, built to help you save smarter, invest with confidence, and track your budget effortlessly. It's designed to simplify money growth, all in one app.",
    },
    {
      question: "Why should I join the waitlist?",
      answer:
        "By joining the waitlist, you'll get early access to Grownee when it launches, along with exclusive features and benefits for early adopters.",
    },
    {
      question: "Is Grownee safe to use?",
      answer:
        "Yes, Grownee uses bank-level encryption and security measures to protect your financial data.",
    },
    {
      question: "When will Grownee launch?",
      answer:
        "We're working hard to launch Grownee soon! Waitlist members will be the first to know.",
    },
    {
      question: "Who can join Grownee?",
      answer:
        "Anyone looking to improve their financial health and budgeting habits can join Grownee.",
    },
    {
      question: "How will I know when Grownee is ready?",
      answer:
        "We'll notify all waitlist members via email when Grownee is ready to launch.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Combine first name and last name
      const fullName = `${formData.firstName} ${formData.lastName}`;

      // Make API request
      const response = await axios.post(
        "https://grownee.onrender.com/api/v1/waitlist", // Add your endpoint
        {
          name: fullName,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({ firstName: "", lastName: "", email: "" });
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(
        err.response?.data?.message ||
          "Failed to join waitlist. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#06321D] text-white animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <img src="/grownee-logo.svg" alt="Grownee" className="h-7" />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                Grownee AI
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                Learn
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                Community
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                About us
              </a>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="border bg-[#06321D] border-white px-4 py-2 rounded-md hover:bg-white hover:text-[#15B369] transition-all duration-300 hover:scale-105"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#06321D] text-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
                Finally, a budget that makes sense and actually works for you.
              </h1>
              <p className="text-gray-300 text-lg mb-8 animate-fade-in-up animation-delay-200">
                Grownee Budget helps you understand your spending, stay
                organized, and hit your goals within weeks of using it.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-emerald-500 text-white px-6 py-3 rounded-md hover:bg-emerald-600 transition-all duration-300 font-medium animate-fade-in-up animation-delay-400 hover:scale-105 hover:shadow-lg"
              >
                Join Waitlist
              </button>
            </div>
            <div className="flex justify-center animate-fade-in-left animation-delay-400">
              <div className="relative w-full max-w-md">
                <img
                  src="/coins-stack.svg"
                  alt="Coins Stack Illustration"
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Budget Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
            Why Budget with Grownee
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-6 animate-fade-in-up animation-delay-200 transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#DEDAFD] mb-4 h-[166px] flex items-center justify-center">
                <img src="/budgeting.png" alt="Grownee" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Simple, visual budgeting
              </h3>
              <p className="text-gray-600">
                No complicated charts. No manual math. Just an intuitive view of
                how you earn, spend, and save.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 animate-fade-in-up animation-delay-400  transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#FFCEE3] p-6 mb-4 h-[166px]">
                <img src="/total-budget.png" alt="Grownee" />
                {/* <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-400 rounded"></div>
                    <span className="text-sm">Your Budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-400 rounded"></div>
                    <span className="text-sm">Investment</span>
                  </div>
                </div> */}
              </div>
              <h3 className="text-xl font-bold mb-2">
                Built around your real life
              </h3>
              <p className="text-gray-600">
                Set flexible budgets that adapt to your lifestyle from daily
                spending tools to monthly financial goals.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-6  animate-fade-in-up animation-delay-600  transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#E8F7FE] p-6 mb-4 relative h-[166px]">
                <div className="bg-[#BFE9FD] p-4 rounded-md">
                  <div>
                    <p className="text-sm text-[#0C5272] font-bold">Insight</p>
                  </div>
                  <p className="text-sm">
                    You’ve spent 15% more on groceries this month compared to
                    last month.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">
                Smart insights, not judgments
              </h3>
              <p className="text-gray-600">
                We don't tell you what to cut. We help you understand your
                patterns, so you can adjust and improve over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Expenses */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#6C3015] rounded-2xl p-8 md:p-12 scroll-animate opacity-0 translate-x-8 hover:scale-105 transition-transform duration-500">
              <img src="/expenses.png" alt="Grownee" />
            </div>
            <div className="scroll-animate opacity-0 -translate-x-8">
              <p className="text-[#584E9F] font-medium mb-2">Expenses</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                How it works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Set your Budget Value</h3>
                    <p className="text-gray-600">
                      From fixed deposits to mutual funds, Grownee helps you
                      invest with clarity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Create Budget Category</h3>
                    <p className="text-gray-600">
                      From fixed deposits to mutual funds, Grownee helps you
                      invest with clarity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Log your Budget Manually</h3>
                    <p className="text-gray-600">
                      From fixed deposits to mutual funds, Grownee helps you
                      invest with clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Income */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 scroll-animate opacity-0 translate-x-8">
              <p className="text-[#584E9F] font-medium mb-2">Income</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                How it works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Set your Budget Value</h3>
                    <p className="text-gray-600">
                      From fixed deposits to mutual funds, Grownee helps you
                      invest with clarity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Create Budget Category</h3>
                    <p className="text-gray-600">
                      From fixed deposits to mutual funds, Grownee helps you
                      invest with clarity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Log your Budget Manually</h3>
                    <p className="text-gray-600">
                      From fixed deposits to mutual funds, Grownee helps you
                      invest with clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#6C3015] rounded-2xl p-8 md:p-12 scroll-animate opacity-0 translate-x-8 hover:scale-105 transition-transform duration-500">
              <img src="/income.png" alt="Grownee" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Title */}
            <div className="scroll-animate opacity-0 translate-y-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#181819]">
                Features that Keep
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-[#181819]">
                You Consistent
              </h2>
            </div>

            {/* Right Column - 2x2 Grid of Features */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8 lg:gap-12">
              {/* Expense Tracking */}
              <div className="scroll-animate opacity-0 translate-y-8">
                <h3 className="text-xl font-bold mb-3">Expense Tracking</h3>
                <p className="text-[#575B60]">
                  Track all your expenses in one view import from your bank or
                  add manually in seconds.
                </p>
              </div>

              {/* Real-Time Insights */}
              <div className="scroll-animate opacity-0 translate-y-8">
                <h3 className="text-xl font-bold mb-3">Real-Time Insights</h3>
                <p className="text-[#575B60]">
                  Visualize spending trends, get notifications, and discover
                  your top spending categories.
                </p>
              </div>

              {/* Recommendations */}
              <div className="scroll-animate opacity-0 translate-y-8">
                <h3 className="text-xl font-bold mb-3">Recommendations</h3>
                <p className="text-[#575B60]">
                  Based on your spending habits, Grownee suggests realistic
                  adjustments to help you stay within target.
                </p>
              </div>

              {/* Monthly Reports */}
              <div className="scroll-animate opacity-0 translate-y-8">
                <h3 className="text-xl font-bold mb-3">Monthly Reports</h3>
                <p className="text-[#575B60]">
                  Receive a monthly financial summary that breaks down your
                  habits, helping you spot leaks and plan better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
            Frequently Asked Questions
          </h2>
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className="w-full py-6 px-2 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-medium text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <span
                    className={`text-2xl text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    {openFaq === index ? (
                      <img src="/faq-minus.svg" alt="FaqMinus" />
                    ) : (
                      <img src="/faq-plus.svg" alt="FaqPlus" />
                    )}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-2 pb-6 animate-slide-in-up">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/grownee-logo-big.svg"
                  alt="Grownee"
                  className="h-7"
                />
              </div>
              <p className="text-sm text-gray-600">
                1004, Akobo Ojurin, Victoria Island, Lagos Nigeria
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Budget</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#15B369] transition-colors duration-300"
                  >
                    Save
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#15B369] transition-colors duration-300"
                  >
                    Invest
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Grownee AI</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#15B369] transition-colors duration-300"
                  >
                    Learn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#15B369] transition-colors duration-300"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About us</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#15B369] transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#15B369] transition-colors duration-300"
                  >
                    support@grownee.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/grownee/"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.4 2.3999C19.2487 2.3999 20.0626 2.73704 20.6628 3.33716C21.2629 3.93728 21.6 4.75121 21.6 5.5999V18.3999C21.6 19.2486 21.2629 20.0625 20.6628 20.6626C20.0626 21.2628 19.2487 21.5999 18.4 21.5999H5.60002C4.75133 21.5999 3.9374 21.2628 3.33728 20.6626C2.73717 20.0625 2.40002 19.2486 2.40002 18.3999V5.5999C2.40002 4.75121 2.73717 3.93728 3.33728 3.33716C3.9374 2.73704 4.75133 2.3999 5.60002 2.3999H18.4ZM9.56002 9.9199H7.32802V16.3999H9.56802V9.9199H9.56002ZM15.032 9.7679C13.976 9.7679 13.432 10.2719 13.128 10.6959L13.024 10.8399V9.9199H10.792L10.8 10.3119V16.3999H13.024V12.7839C13.0108 12.6163 13.0324 12.4478 13.0875 12.289C13.1426 12.1302 13.2301 11.9846 13.3444 11.8613C13.4586 11.738 13.5972 11.6398 13.7514 11.5727C13.9055 11.5057 14.0719 11.4714 14.24 11.4719C15.008 11.4719 15.336 11.9999 15.368 12.7999V16.3999H17.6V12.6879C17.6 10.6959 16.504 9.7679 15.04 9.7679H15.032ZM8.46402 6.7999C7.69602 6.7999 7.20002 7.2799 7.20002 7.9199C7.20002 8.5039 7.63202 8.9759 8.30402 9.0399H8.44802C9.22402 9.0399 9.70402 8.5439 9.70402 7.9199C9.69602 7.2799 9.22402 6.7999 8.46402 6.7999Z"
                      fill="#575B60"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/growneeapp?igsh=MXduam8zbnp5cnZseA=="
                  target="_blank"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.09253 2.625C5.0779 2.625 2.625 5.07935 2.625 8.09473V15.9067C2.625 18.9217 5.07935 21.375 8.09473 21.375H15.9067C18.9217 21.375 21.375 18.9206 21.375 15.9053V8.09253C21.375 5.0779 18.9206 2.625 15.9053 2.625H8.09253ZM17.625 5.625C18.039 5.625 18.375 5.961 18.375 6.375C18.375 6.789 18.039 7.125 17.625 7.125C17.211 7.125 16.875 6.789 16.875 6.375C16.875 5.961 17.211 5.625 17.625 5.625ZM12 7.125C14.6888 7.125 16.875 9.31125 16.875 12C16.875 14.6888 14.6884 16.875 12 16.875C9.31125 16.875 7.125 14.6884 7.125 12C7.125 9.31163 9.31125 7.125 12 7.125ZM12 8.625C10.1359 8.625 8.625 10.1359 8.625 12C8.625 13.8641 10.1359 15.375 12 15.375C13.8641 15.375 15.375 13.8641 15.375 12C15.375 10.1359 13.8641 8.625 12 8.625Z"
                      fill="#575B60"
                    />
                  </svg>
                </a>
                <a
                  href="https://x.com/growneeapp?s=21&t=5ndmil_UgIjygzEhJtjfgw"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.32211 2.87988L10.1462 12.8286L2.99023 21.1199H4.51555L10.8221 13.813L15.834 21.1199H20.6405L13.4996 10.7099L20.258 2.87988H18.7337L12.8246 9.72551L8.12867 2.87988H3.32211Z"
                      fill="#575B60"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <>
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            >
              ×
            </button>

            {!showSuccess ? (
              <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-scale-in">
                <h2 className="text-2xl font-semibold mb-2 text-[#151B19]">
                  Join Grownee's Waitlist
                </h2>
                <p className="text-[#575B60] font-normal mb-6">
                  Get early access to Grownee when it launches
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-normal mb-2 text-[#181819]">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                        className="w-full px-4 py-2 border border-[#D9DCDF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA960] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-normal mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                        className="w-full px-4 py-2 border border-[#D9DCDF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA960] transition-all"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-normal mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      required
                      className="w-full px-4 py-2 border border-[#D9DCDF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA960] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0EA960] text-white py-3 rounded-lg font-medium hover:bg-[#0EA960] transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </button>

                  <p className="text-[16px] font-normal text-gray-500 mt-4 ">
                    By submitting your email, you agree to our{" "}
                    <a href="#" className="underline">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            ) : (
              // Success Message
              <div className="bg-white rounded-2xl max-w-md w-full text-center animate-fade-in-up">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-white text-2xl bg-white/20 rounded-full  w-10 h-10 transition-colors"
                >
                  ×
                </button>
                {/* Confetti Animation */}
                {/* <div className="relative mb-6">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center animate-scale-in">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => {
                      const angle = (i * 18 * Math.PI) / 180;
                      const distance = 100;
                      const xOffset = Math.cos(angle) * distance;

                      return (
                        <div
                          key={i}
                          className="absolute w-2 h-2"
                          style={
                            {
                              left: "50%",
                              top: "50%",
                              backgroundColor: [
                                "#10b981",
                                "#fbbf24",
                                "#3b82f6",
                                "#ec4899",
                                "#8b5cf6",
                              ][i % 5],
                              animation: `confetti 1.5s ease-out ${
                                i * 0.05
                              }s forwards`,
                              "--x-offset": `${xOffset}px`,
                            } as React.CSSProperties
                          }
                        />
                      );
                    })}
                  </div>
                </div> */}
                <img
                  src="/confetti.png"
                  alt="Grownee"
                  className="rounded-t-2xl"
                />

                <div className="p-10">
                  <h2 className="text-2xl font-bold mb-2">
                    Thank you for joining the waitlist
                  </h2>
                  <p className="text-gray-600">
                    We'll keep you updated on our product updates, and other
                    updates that comes from us.
                  </p>
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
}
