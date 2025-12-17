import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  NotebookPen,
} from 'lucide-react';
import FooterSkeleton from '../skeleton/component/FooterSkeleton';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import StaticInfoModal from '../components/ui/modals/StaticInfoModal';

export const Footer = ({ isLoading = false }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleOpen = (section) => setActiveCard(section);
  const handleClose = () => setActiveCard(null);

  if (isLoading) return <FooterSkeleton />;

  // Animation variants for the entire footer container
  const footerContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren', // Animate the container before its children
        staggerChildren: 0.2, // Stagger the animation of child elements
      },
    },
  };

  // Animation variants for the individual footer sections
  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the logo hover effect
  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -2, 2, 0],
      transition: {
        scale: { type: 'spring', stiffness: 400, damping: 17 },
        rotate: { duration: 0.8, ease: 'easeInOut' },
      },
    },
  };

  // Animation variants for the social icons
  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        scale: { type: 'spring', stiffness: 400, damping: 17 },
        rotate: { duration: 0.6, ease: 'easeInOut' },
      },
    },
  };

  // Animation variants for the quick link hover effect
  const linkHoverVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 20,
      },
    },
  };

  return (
    <>
      <motion.footer
        className="bg-card text-card-foreground border-t border-border py-12 px-4 relative z-10"
        variants={footerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding */}
          <motion.div variants={footerItemVariants}>
            <motion.div
              className="flex items-center gap-3 text-primary"
              variants={logoVariants}
              whileHover="hover"
            >
              <h2 className="flex text-2xl font-bold mb-4">
                <NotebookPen className="me-2 h-8 w-8" />
                <a href="/home">BlogSphere</a>
              </h2>
            </motion.div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A place to explore stories, tutorials, and ideas from tech
              enthusiasts. Connect, read, and grow with us.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={footerItemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3 text-muted-foreground">
              {[
                { name: 'About Us', key: 'about' },
                { name: 'Contact', key: 'contact' },
                { name: 'Privacy Policy', key: 'privacy' },
                { name: 'Terms of Service', key: 'terms' },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleOpen(item.key)}
                    className="group flex items-center hover:text-primary transition-all duration-300"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 bg-primary rounded-full mr-3"
                      variants={linkHoverVariants}
                      initial="hidden"
                      animate="hidden"
                      whileHover="visible"
                    ></motion.span>
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={footerItemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href=""
                target="_blank"
                rel="noreferrer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="cursor-pointer bg-secondary p-2 rounded-full text-secondary-foreground hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>

              <motion.a
                href=""
                target="_blank"
                rel="noreferrer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="cursor-pointer bg-secondary p-2 rounded-full text-secondary-foreground hover:bg-black hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>

              <motion.a
                href=""
                target="_blank"
                rel="noreferrer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="cursor-pointer bg-secondary p-2 rounded-full text-secondary-foreground hover:bg-pink-600 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>

              <motion.a
                href=""
                target="_blank"
                rel="noreferrer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="cursor-pointer bg-secondary p-2 rounded-full text-secondary-foreground hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={footerItemVariants}
          className="text-center text-sm text-muted-foreground mt-12 border-t border-border pt-8"
        >
          &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
        </motion.div>

        <motion.div
          variants={footerItemVariants}
          className="p-4 mt-2 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <p>Made with</p>
          <GlowCapture className="hover:scale-110">
            <Glow className="Glow: text-red-500 Glow:shadow-lg">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-destructive heartbeat"
              />
            </Glow>
          </GlowCapture>
          <p>
            by <b>Kanika</b>
          </p>
        </motion.div>
      </motion.footer>

      {/* Card Modal */}
      <StaticInfoModal activeCard={activeCard} onClose={handleClose} />
    </>
  );
};

export default Footer;