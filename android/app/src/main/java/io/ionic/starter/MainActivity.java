package io.ionic.starter;

import android.os.Bundle;
import android.graphics.Color;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
      getWindow().setNavigationBarColor(Color.BLACK); // Измените цвет на нужный вам
    }
  }
}
