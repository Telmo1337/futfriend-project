import BaseView from "../BaseView";
import { Typography } from "@mui/material";

const Help = () => (
  <BaseView title="Ajuda">
    <Typography>
      Precisas de suporte? Contacta a equipa FutFriend em
      {" "}
      <strong>support@futfriend.com</strong>.
    </Typography>
  </BaseView>
);

export default Help;
