import React from 'react';
import { Star } from '../../../home/UI/Icons';
import BookButton from './BookButton';

const DoctorCard = ({ doc, isInCart, cartItem, openDoctorModal, handleRemoveCartItem }) => {
  return (
    <div className="py-10 sm:py-12 first:pt-1 last:pb-1 flex items-start justify-between gap-4 sm:gap-8 group">
      {/* LEFT COLUMN: TEXT ORDER & HIERARCHY */}
      <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {doc.name}
        </h3>

        <div className="flex items-center space-x-1 text-xs text-slate-500 font-medium">
          <Star className="w-3 h-3 fill-slate-600 text-slate-900 shrink-0" />
          <span className="text-[11px] font-bold text-slate-900">{doc.rating || '4.85'}</span>
          <span className="text-[11px] sm:text-sm text-slate-400 font-normal underline decoration-dotted">(1.2K reviews)</span>
        </div>

        {/* SUBTLE DOTTED HORIZONTAL LINE */}
        <div className="border-b border-dotted border-slate-400/45 my-3 sm:my-4 py-1 w-full" />

        <p className="text-[11px] sm:text-sm text-slate-600 font-medium leading-relaxed">
          {doc.degree} • <span className="text-emerald-600 font-medium">{doc.experience}</span>
        </p>

        {/* HELPER TEXT / SHORT DESCRIPTION */}
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium leading-relaxed line-clamp-2 max-w-xl pt-0.5">
          {doc.about || 'Specialized in newborn care, child growth monitoring & general pediatric consultation.'}
        </p>

        <div className="text-sm sm:text-base font-bold text-slate-900 pt-2">
          ₹{doc.fee || doc.audioCallFee || 500}
        </div>
      </div>

      {/* RIGHT COLUMN: DOCTOR IMAGE BOX & OVERLAID ADD BUTTON */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="relative w-36 h-36 sm:w-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
          <img
            src={doc.image}
            alt={doc.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
            Available
          </div>
        </div>

        {/* GSAP BOOK / QUANTITY COUNTER OVERLAID AT BOTTOM CENTER */}
        <div className="absolute -bottom-3 sm:-bottom-3.5 z-10">
          <BookButton
            isInCart={isInCart}
            cartItem={cartItem}
            onAdd={() => openDoctorModal(doc)}
            onRemove={handleRemoveCartItem}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
