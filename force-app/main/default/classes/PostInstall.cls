global class PostInstall implements InstallHandler {
  global void onInstall(InstallContext context) {
    system.debug(context);
  }
}
