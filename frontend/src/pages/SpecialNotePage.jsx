import React from 'react';
import { motion } from 'framer-motion';

const SpecialNotePage = ({ onNext }) => {
  return (
    <div className="page-container">
      <motion.div 
        className="glass-card"
        style={{ padding: '50px', maxWidth: '600px', width: '100%' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 style={{ color: '#ff4d6d', marginBottom: '30px', fontStyle: 'italic' }}>A Special Message 💌</h2>
        <p style={{ 
          fontSize: '1.6rem', 
          color: '#c9184a', 
          lineHeight: '1.8', 
          whiteSpace: 'pre-line',
          marginBottom: '40px' 
        }}>
          "Hii 👋 Happy Birthday 🎂🎉
First thanks 🙏 for enakku support pannathuku 🤝, and enna happy aakunathuku 😊💫... athuku romba thanks ❤️

Unnala naa happy ah irruntha 😄, nee naa thaniya irrukumpothu enakku support ah irrunthu irruka 🤍… ini irrupiya nu therla , so thanks for that 🙏✨

And sorry 😔 if naa unna disturb or hurt panni irruntha 💔, I’m so sorry 🙏

Eppothumey nee un life la happy ah irru 😄✨, life ah enjoy pannu 🎈🎶, yaaru life la ethir paakatha, bold ah irru 💪, strong ah irru 🛡️

Nee un frds 👯‍♀️ and family 👨‍👩‍👧 oda happy ah irru ❤️🏡
Career la focus ah irru 📚🎯

Unakku enna help venunalu kelu 🤝, naa unakku help panren 🙋‍♂️

Intha gift 🎁 and note 📝 cring ah irrukala 😅, but ennaku thonuchu solliten 🤭
Intha gift unakku pudikkum nu namburen 😊💖

HAPPY BIRTHDAY AGAIN 🎂🎉✨ "
        </p>
        <button className="glow-button" onClick={onNext}>
          Next 🌈
        </button>
      </motion.div>
    </div>
  );
};

export default SpecialNotePage;
