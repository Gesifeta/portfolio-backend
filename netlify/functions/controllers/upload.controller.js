// image url
export const getImageUrl = (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", image_url: false });
    }
    if (req.file.size > 5000000) {
      return res.status(400).json({
        message: "File size is too large",
        image_url: false,
      });
    }
    return res.status(200).json({ image_url: req.file.path });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Unexpected error occured",
      image_url: false,
    });
  }
};
