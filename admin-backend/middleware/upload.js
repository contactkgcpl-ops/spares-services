const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helper function to slugify text
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with _
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '_')         // Replace multiple - with _
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Get product title from request body
    const productTitle = req.body.title || 'product';
    const slugifiedTitle = slugify(productTitle);
    
    // Get file extension
    const ext = path.extname(file.originalname).toLowerCase();
    
    // Create base filename
    let filename = slugifiedTitle + ext;
    
    // Handle duplicates
    let counter = 1;
    const originalFilename = filename;
    while (fs.existsSync(path.join(uploadsDir, filename))) {
      const nameWithoutExt = slugifiedTitle;
      filename = `${nameWithoutExt}_${counter}${ext}`;
      counter++;
    }
    
    console.log('=== MULTER UPLOAD DEBUG ===');
    console.log('Upload directory:', uploadsDir);
    console.log('Product title:', productTitle);
    console.log('Slugified title:', slugifiedTitle);
    console.log('Original filename:', file.originalname);
    console.log('Final filename:', filename);
    console.log('File extension:', ext);
    console.log('=== END DEBUG ===');
    
    cb(null, filename);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;
