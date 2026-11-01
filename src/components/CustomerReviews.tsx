import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, Sparkles, User } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { CustomerReview } from '../types/restaurant';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    neighborhood: '',
    rating: 5,
    comment: '',
    favoriteDish: 'Chicken Tikka Pizza',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) return;

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newReview.author.trim(),
      neighborhood: newReview.neighborhood.trim() || 'Bahawalpur',
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment.trim(),
      favoriteDish: newReview.favoriteDish,
    };

    setReviewsList([created, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setNewReview({
        author: '',
        neighborhood: '',
        rating: 5,
        comment: '',
        favoriteDish: 'Chicken Tikka Pizza',
      });
    }, 1800);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0d0d0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47721]/15 border border-[#F47721]/30 text-xs font-bold text-[#F47721] uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-[#F47721]" />
              <span>Customer Word of Mouth</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-2">
              LOVED IN BAHAWALPUR
            </h2>
            <p className="text-sm sm:text-base text-[#FFF4E5]/70 max-w-xl">
              Hear what our local foodies say about our fresh crusts, juicy zinger burgers, and swift deliveries.
            </p>
            <p className="text-xs text-[#FFF4E5]/40 mt-1">
              *Sample reviews during development. Real reviews can be synced dynamically.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-[#F47721]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#17171a] border border-white/10 flex flex-col justify-between hover:border-[#F47721]/30 transition-all duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'text-[#F47721] fill-[#F47721]'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-white/50 ml-2 font-mono tabular-nums">
                    {rev.rating}.0
                  </span>
                </div>

                <p className="text-sm text-[#FFF4E5]/80 leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F47721]/20 text-[#F47721] font-bold flex items-center justify-center text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm text-white truncate">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-[#FFF4E5]/50 truncate">
                      {rev.neighborhood} · {rev.date}
                    </div>
                  </div>
                </div>

                {rev.favoriteDish && (
                  <div className="mt-3 text-[10px] text-[#F47721] bg-[#F47721]/10 px-2.5 py-1 rounded-md inline-block font-medium">
                    Favorite: {rev.favoriteDish}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-[#161619] border border-white/15 p-6 sm:p-8 text-left shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="font-display font-bold text-xl text-white">
                    Share Your Food Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniyal Khan"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#F47721]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Area / Colony in Bahawalpur
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Model Town, Cantt, Satellite Town"
                    value={newReview.neighborhood}
                    onChange={(e) =>
                      setNewReview({ ...newReview, neighborhood: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#F47721]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? 'text-[#F47721] fill-[#F47721]'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Favorite Dish
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chicken Tikka Pizza, Loaded Fries"
                    value={newReview.favoriteDish}
                    onChange={(e) =>
                      setNewReview({ ...newReview, favoriteDish: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#F47721]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what you loved about the food, taste, or speed of service..."
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#F47721]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#F47721] hover:bg-[#ff8a3d] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-display font-bold text-xl text-white mb-1">
                  Thank You for Your Review!
                </h4>
                <p className="text-xs text-[#FFF4E5]/70">
                  Your feedback helps keep Oven Bites the favorite pizzeria in Bahawalpur!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
