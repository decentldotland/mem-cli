import figlet from "figlet";

export async function initer() {
  figlet("MEM", "Standard", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    console.log(`[*] developed by: decent.land`);
    console.log(`[*] github: https://github.com/decentldotland/mem-cli`);
    console.log(`[*] Twitter: @mem_tech \n\n`);
  });
}
