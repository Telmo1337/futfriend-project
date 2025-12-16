import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from "@toolpad/core/Account";
import Stack from "@mui/material/Stack";



function SidebarFooterAccount({ mini }) {
  return (
    <Account
      slots={{
        preview: (props) => (
          <>
            <AccountPreview
              {...props}
              variant={mini ? "condensed" : "expanded"}
            />
          </>
        ),
        popoverContent: () => (
          <Stack>
            <AccountPopoverFooter>
              <SignOutButton />
            </AccountPopoverFooter>
          </Stack>
        ),
      }}
    />
  );
}

export default SidebarFooterAccount;
