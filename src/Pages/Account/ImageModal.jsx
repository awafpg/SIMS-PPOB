import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUpdateImageMutation } from "../../Store/membership/membershipReducer";
import { useNavigate } from "react-router-dom";

export const ImageModal = ({ isOpen, onClose }) => {
  const [upload, { isLoading }] = useUpdateImageMutation();
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const file = e.target.files[0];

    // Reset error message
    setError("");

    // Check file type and size
    if (file) {
      const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
      const isUnder1MB = file.size <= 1 * 1024 * 1024; // 1MB in bytes

      if (!isJpeg) {
        setError("Only JPEG/JPG format is allowed.");
      } else if (!isUnder1MB) {
        setError("File size must be less than 1MB.");
      } else {
        setImageFile(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please select an image file before submitting.");
      return;
    }

    if (imageFile) {
      // Here you can add logic to handle the image upload (e.g., send the file to an API)
      console.log("Image File:", imageFile);
      const formData = new FormData();
      formData.append("file", imageFile);
      console.log("Image File:", formData);
      try {
        const result = await upload(formData).unwrap();
        console.log(result);
        if (result.status === 0) {
          alert(result.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
      // Reset the input field after submission
      setImageFile(null);
    }
    onClose();
    navigate("/account");
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <h2>Upload Gambar</h2>
                <form>
                  <Input
                    type="file"
                    accept="image/jpeg,image/jpg"
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {error && (
                    <p className="flex justify-center p-4" color="error">
                      {error}
                    </p>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isDisabled={isLoading}
                  type="submit"
                  onClick={handleSubmit}
                  color="primary"
                  style={{ marginTop: "20px" }}
                  disabled={!imageFile}
                >
                  {isLoading ? "Loading..." : "Submit "}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
